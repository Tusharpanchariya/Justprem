-- Supabase SQL Migration for Connect Form Inquiries

-- 1. Create Connect Inquiries Table
create table if not exists public.connect_inquiries (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  subscribe_news boolean default false,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.connect_inquiries enable row level security;

-- 3. Create Policy to allow public visitors to submit inquiries
create policy "Public can submit connect inquiries"
  on public.connect_inquiries
  for insert
  with check (true);

-- 4. Create Policy to allow admin access for reading inquiries
create policy "Public can read connect inquiries"
  on public.connect_inquiries
  for select
  using (true);
