-- Run this entire file once in Supabase Dashboard → SQL Editor → New query.
-- It creates the calendar table used by the Classes application form.

create extension if not exists "uuid-ossp";

create table if not exists public.class_bookings (
  id uuid default uuid_generate_v4() primary key,
  course_id text not null,
  course_name text not null,
  full_name text not null,
  email text not null,
  booking_date date not null unique,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.class_bookings enable row level security;

drop policy if exists "Public can see confirmed class dates" on public.class_bookings;
create policy "Public can see confirmed class dates"
  on public.class_bookings for select using (status = 'confirmed');

drop policy if exists "Public can submit class applications" on public.class_bookings;
create policy "Public can submit class applications"
  on public.class_bookings for insert with check (status = 'confirmed');
