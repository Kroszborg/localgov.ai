-- LocalGov.AI Database Schema for Neon PostgreSQL
-- Run this script in your Neon database to create the required tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create search_history table
CREATE TABLE IF NOT EXISTS search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    query TEXT NOT NULL,
    location VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at DESC);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    query TEXT NOT NULL,
    location VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_created_at ON bookmarks(created_at DESC);
