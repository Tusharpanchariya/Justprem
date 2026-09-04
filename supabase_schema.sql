-- JustPrem Supabase Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  short_description text,
  price_inr numeric not null,
  price_usd numeric,
  sale_price numeric,
  key_count integer,
  weight numeric,
  dimensions text,
  material text,
  finish text,
  features text[],
  stock integer default 0,
  availability text check (availability in ('IN_STOCK', 'LOW_STOCK', 'ON_DEMAND', 'PRE_ORDER', 'SOLD_OUT')),
  production_time text,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Product Images
create table public.product_images (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade,
  url text not null,
  alt_text text,
  is_primary boolean default false,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Product Audio (for interactive keys and demo)
create table public.product_audio (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade,
  note text, -- e.g. "C4", "C#4", or null if demo
  audio_url text not null,
  is_demo boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Customers
create table public.customers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  full_name text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,
  customer_id uuid references public.customers(id),
  total_amount numeric not null,
  currency text default 'INR',
  payment_status text check (payment_status in ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
  order_status text check (order_status in ('PENDING', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
  shipping_address jsonb,
  payment_reference text, -- Razorpay Payment ID / Order ID
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity integer not null default 1,
  unit_price numeric not null,
  subtotal numeric not null
);

-- Retreats
create table public.retreats (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  location text,
  start_date date,
  end_date date,
  duration text,
  short_description text,
  full_description text,
  starting_price numeric,
  availability text check (availability in ('OPEN', 'LIMITED', 'WAITLIST', 'CLOSED')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Retreat Registrations
create table public.retreat_registrations (
  id uuid default uuid_generate_v4() primary key,
  retreat_id uuid references public.retreats(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  country text,
  participants integer default 1,
  message text,
  status text default 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies can be added here

-- Customer reviews published through the website
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  rating integer not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 10 and 2000),
  is_visible boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.reviews add column if not exists avatar_url text;

insert into storage.buckets (id, name, public)
values ('review-avatars', 'review-avatars', true)
on conflict (id) do update set public = true;

create policy "Public can upload review avatars" on storage.objects for insert with check (bucket_id = 'review-avatars');
create policy "Public can view review avatars" on storage.objects for select using (bucket_id = 'review-avatars');

alter table public.reviews enable row level security;
create policy "Public can read visible reviews" on public.reviews for select using (is_visible = true);
create policy "Public can submit reviews" on public.reviews for insert with check (is_visible = true);
