import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/lib/stack';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await pool.query(
      `SELECT id, title, content, query, location, created_at
       FROM bookmarks
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 10`,
      [user.id]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, query, location } = await request.json();

    if (!title || !content || !query || !location) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO bookmarks (user_id, title, content, query, location, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [user.id, title, content, query, location]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving bookmark:', error);
    return NextResponse.json({ error: 'Failed to save bookmark' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await pool.query(
      'DELETE FROM bookmarks WHERE id = $1 AND user_id = $2',
      [id, user.id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 });
  }
}
