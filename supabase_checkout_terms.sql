-- Run once in the Supabase SQL editor before enabling checkout terms acceptance.
create table if not exists public.checkout_orders (
  id uuid primary key default gen_random_uuid(),
  customer_email text not null,
  country_code text not null check (country_code ~ '^[A-Z]{2}$'),
  currency text not null,
  order_total numeric(12,2) not null check (order_total >= 0),
  order_snapshot jsonb not null,
  customer_snapshot jsonb not null,
  payment_status text not null default 'pending',
  payment_provider text,
  payment_reference text,
  created_at timestamptz not null default now()
);

create table if not exists public.checkout_policy_acceptances (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.checkout_orders(id),
  accepted boolean not null check (accepted),
  accepted_at timestamptz not null default now(),
  policy_version text not null,
  policy_snapshot jsonb not null,
  policy_type text not null default 'harmonium-purchase',
  country_code text not null check (country_code ~ '^[A-Z]{2}$'),
  currency text not null,
  order_total numeric(12,2) not null,
  consent_method text not null default 'checkout-checkbox'
);

create table if not exists public.checkout_withdrawal_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  order_reference text not null,
  statement text not null,
  submitted_at timestamptz not null default now()
);

alter table public.checkout_orders enable row level security;
alter table public.checkout_policy_acceptances enable row level security;
alter table public.checkout_withdrawal_requests enable row level security;
revoke all on public.checkout_orders, public.checkout_policy_acceptances, public.checkout_withdrawal_requests from anon, authenticated;
grant all on public.checkout_orders, public.checkout_policy_acceptances, public.checkout_withdrawal_requests to service_role;

create or replace function public.reject_checkout_acceptance_mutation()
returns trigger language plpgsql as $$ begin raise exception 'Checkout policy acceptance records are immutable'; end; $$;
drop trigger if exists checkout_acceptance_immutable on public.checkout_policy_acceptances;
create trigger checkout_acceptance_immutable before update or delete on public.checkout_policy_acceptances
for each row execute function public.reject_checkout_acceptance_mutation();
drop trigger if exists checkout_withdrawal_immutable on public.checkout_withdrawal_requests;
create trigger checkout_withdrawal_immutable before update or delete on public.checkout_withdrawal_requests
for each row execute function public.reject_checkout_acceptance_mutation();

create or replace function public.create_checkout_consent(
  p_email text, p_country_code text, p_currency text, p_order_total numeric,
  p_order_snapshot jsonb, p_customer_snapshot jsonb,
  p_policy_version text, p_policy_snapshot jsonb
) returns uuid language plpgsql security definer set search_path = public as $$
declare v_order_id uuid; v_acceptance_id uuid;
begin
  if p_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or p_country_code !~ '^[A-Z]{2}$' or p_currency !~ '^[A-Z]{3}$' or p_order_total < 0 then
    raise exception 'Invalid checkout data';
  end if;
  insert into checkout_orders(customer_email,country_code,currency,order_total,order_snapshot,customer_snapshot)
  values (lower(p_email),p_country_code,p_currency,p_order_total,p_order_snapshot,p_customer_snapshot) returning id into v_order_id;
  insert into checkout_policy_acceptances(order_id,accepted,policy_version,policy_snapshot,country_code,currency,order_total)
  values (v_order_id,true,p_policy_version,p_policy_snapshot,p_country_code,p_currency,p_order_total) returning id into v_acceptance_id;
  return v_acceptance_id;
end; $$;
revoke all on function public.create_checkout_consent(text,text,text,numeric,jsonb,jsonb,text,jsonb) from public, anon, authenticated;
grant execute on function public.create_checkout_consent(text,text,text,numeric,jsonb,jsonb,text,jsonb) to service_role;
