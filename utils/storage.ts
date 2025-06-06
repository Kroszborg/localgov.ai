// utils/storage.ts
export function clearAuthStorage() {
  if (typeof window === 'undefined') return;
  
  try {
    // Clear all Supabase-related items
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth'))) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Also clear sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth'))) {
        sessionStorage.removeItem(key);
      }
    }
    
    console.log('Auth storage cleared');
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}

export function debugAuthStorage() {
  if (typeof window === 'undefined') return;
  
  console.log('=== Local Storage ===');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth'))) {
      console.log(key, localStorage.getItem(key));
    }
  }
  
  console.log('=== Session Storage ===');
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth'))) {
      console.log(key, sessionStorage.getItem(key));
    }
  }
}