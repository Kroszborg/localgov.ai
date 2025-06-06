import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function DELETE(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get the user's JWT from the cookies/headers
  const authHeader = req.headers.get('authorization');
  const jwt = authHeader?.replace('Bearer ', '') || req.cookies.get('sb-access-token')?.value;

  if (!jwt) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Get the user from the JWT
  const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(jwt);
  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Delete the user
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
} 