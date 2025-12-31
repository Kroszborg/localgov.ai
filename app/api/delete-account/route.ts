import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/lib/stack';
import pool from '@/lib/db';

export async function DELETE(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Delete user's data from database
    await pool.query('DELETE FROM search_history WHERE user_id = $1', [user.id]);
    await pool.query('DELETE FROM bookmarks WHERE user_id = $1', [user.id]);

    // Delete user account from Stack Auth
    await user.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
