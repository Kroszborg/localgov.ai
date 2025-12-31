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
      `SELECT id, query, location, created_at
       FROM search_history
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 10`,
      [user.id]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching search history:', error);
    return NextResponse.json({ error: 'Failed to fetch search history' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { query, location } = await request.json();

    if (!query || !location) {
      return NextResponse.json({ error: 'Query and location are required' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO search_history (user_id, query, location, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [user.id, query, location]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving search history:', error);
    return NextResponse.json({ error: 'Failed to save search history' }, { status: 500 });
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
      'DELETE FROM search_history WHERE id = $1 AND user_id = $2',
      [id, user.id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting search history:', error);
    return NextResponse.json({ error: 'Failed to delete search history' }, { status: 500 });
  }
}
