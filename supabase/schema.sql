-- Supabase Database Schema for CareerLift Job Search Platform
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- USERS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_status TEXT,
  subscription_tier TEXT,
  stripe_customer_id TEXT UNIQUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- USER PROFILES TABLE (Job Search Specific)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  resume_url TEXT,
  resume_text TEXT, -- Extracted text from resume
  skills TEXT[], -- Array of skills
  experience_years INTEGER,
  experience_summary TEXT,
  job_title_target TEXT,
  location_preference TEXT,
  remote_preference TEXT, -- 'remote', 'hybrid', 'onsite'
  salary_min INTEGER,
  salary_max INTEGER,
  industries TEXT[], -- Target industries
  experience_level TEXT, -- 'entry', 'mid', 'senior', 'lead'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ===========================================
-- JOB LISTINGS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS public.job_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  external_id TEXT NOT NULL, -- ID from job board
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  salary TEXT,
  description TEXT,
  requirements TEXT[],
  source TEXT NOT NULL, -- 'LinkedIn', 'Indeed', etc.
  url TEXT NOT NULL,
  match_score INTEGER, -- 0-100
  posted_date TIMESTAMP WITH TIME ZONE,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_applied BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- APPLICATIONS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.job_listings(id) ON DELETE CASCADE,
  cover_letter TEXT,
  status TEXT DEFAULT 'applied', -- 'applied', 'viewed', 'response', 'rejected', 'offer'
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- AI REQUESTS TABLE (Keep for AI features)
-- ===========================================
CREATE TABLE IF NOT EXISTS public.ai_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL, -- 'cover_letter', 'resume_analysis', etc.
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- INDEXES
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON public.users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_job_listings_user_id ON public.job_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_job_listings_match_score ON public.job_listings(match_score DESC);
CREATE INDEX IF NOT EXISTS idx_job_listings_posted_date ON public.job_listings(posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_applied_at ON public.applications(applied_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_requests_user_id ON public.ai_requests(user_id);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_requests ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- User profiles policies
CREATE POLICY "Users can view own user profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own user profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own user profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Job listings policies
CREATE POLICY "Users can view own job listings"
  ON public.job_listings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job listings"
  ON public.job_listings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Applications policies
CREATE POLICY "Users can view own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON public.applications FOR UPDATE
  USING (auth.uid() = user_id);

-- AI requests policies
CREATE POLICY "Users can view own AI requests"
  ON public.ai_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI requests"
  ON public.ai_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ===========================================
-- FUNCTIONS AND TRIGGERS
-- ===========================================

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  
  INSERT INTO public.user_profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER on_user_updated
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_user_profile_updated
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to update application status timestamp
CREATE OR REPLACE FUNCTION public.handle_application_status_update()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    NEW.status_updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_application_status_updated
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_application_status_update();

-- ===========================================
-- PERMISSIONS
-- ===========================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.job_listings TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.applications TO authenticated;
GRANT SELECT, INSERT ON public.ai_requests TO authenticated;

-- ===========================================
-- VIEWS (for analytics)
-- ===========================================

-- Application statistics view
CREATE OR REPLACE VIEW public.user_application_stats AS
SELECT 
  user_id,
  COUNT(*) as total_applications,
  COUNT(CASE WHEN status = 'viewed' THEN 1 END) as profile_views,
  COUNT(CASE WHEN status = 'response' THEN 1 END) as responses,
  COUNT(CASE WHEN status = 'offer' THEN 1 END) as offers,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejections,
  ROUND(
    (COUNT(CASE WHEN status IN ('viewed', 'response', 'offer') THEN 1 END)::numeric / 
    NULLIF(COUNT(*)::numeric, 0)) * 100, 
    2
  ) as response_rate
FROM public.applications
GROUP BY user_id;

GRANT SELECT ON public.user_application_stats TO authenticated;
