// Environment variable validation
// This ensures all required environment variables are present

function validateEnv() {
  const requiredEnvVars = {
    // Database
    DATABASE_URL: process.env.DATABASE_URL,

    // Stack Auth (Client-side - public)
    NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,

    // Stack Auth (Server-side - secret)
    STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY,

    // Gemini API
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  };

  const missing: string[] = [];
  const invalid: string[] = [];

  // Check for missing or empty variables
  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      missing.push(key);
    }
  });

  // Validate DATABASE_URL format
  if (requiredEnvVars.DATABASE_URL && !requiredEnvVars.DATABASE_URL.startsWith('postgresql://')) {
    invalid.push('DATABASE_URL must start with postgresql://');
  }

  // Report errors
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(v => `  - ${v}`).join('\n')}\n\n` +
      `Please check your .env file and ensure all required variables are set.`
    );
  }

  if (invalid.length > 0) {
    throw new Error(
      `Invalid environment variables:\n${invalid.map(v => `  - ${v}`).join('\n')}`
    );
  }
}

// Run validation
if (typeof window === 'undefined') {
  // Only validate on server-side
  try {
    validateEnv();
    console.log('✓ All environment variables validated successfully');
  } catch (error) {
    console.error('Environment variable validation failed:');
    console.error(error);
    // In development, we want to see the error
    // In production, we want to fail fast
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
  STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY!,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
};
