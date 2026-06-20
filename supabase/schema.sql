-- Enable UUID generation extension
create extension if not exists "uuid-ossp";

-- 1. CALCULATORS TRACKING TABLE
create table public.calculators (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    title text not null,
    category text not null check (category in ('crypto', 'freelance', 'investing')),
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. CALCULATION USER LOGS (Anonymized analytics)
create table public.calculation_logs (
    id uuid default uuid_generate_v4() primary key,
    calculator_id uuid references public.calculators(id) on delete cascade not null,
    inputs jsonb not null,
    outputs jsonb not null,
    ip_hashed text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. INTERACTIVE COMMUNITY FEEDBACK / STRATEGIC VOTES
create table public.tool_feedback (
    id uuid default uuid_generate_v4() primary key,
    calculator_id uuid references public.calculators(id) on delete cascade not null,
    rating integer check (rating >= 1 and rating <= 5) not null,
    comment text check (char_length(comment) <= 500),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- INDEXES FOR MAXIMUM QUERY EFFICIENCY
create index idx_calc_logs_calculator on public.calculation_logs(calculator_id);
create index idx_calc_slug on public.calculators(slug);

-- ROW LEVEL SECURITY (RLS) CONSTRAINTS
alter table public.calculators enable row level security;
alter table public.calculation_logs enable row level security;
alter table public.tool_feedback enable row level security;

-- RLS POLICIES (Public read access, insert-only for end users)
create policy "Allow public read access to calculators" on public.calculators 
    for select using (true);

create policy "Allow public insert to calculation_logs" on public.calculation_logs 
    for insert with check (true);

create policy "Allow public read/write to tool_feedback" on public.tool_feedback 
    for all using (true);

-- SEED DATA WITH STATIC UUIDs
insert into public.calculators (id, slug, title, category) values
('7bdf7580-2aee-4cbe-b435-021c33c36c61', 'crypto-dca-runway', 'Crypto Dollar-Cost Averaging & Runway Visualizer', 'crypto'),
('a1b2c3d4-5e6f-7890-abcd-ef1234567890', 'freelancer-tax-runway', 'Freelancer Income, Tax & Runway Calculator', 'freelance'),
('b2c3d4e5-6f78-90ab-cdef-123456789012', 'portfolio-risk-visualizer', 'Portfolio Allocation & Volatility Risk Simulator', 'investing')
on conflict (slug) do nothing;
-- 4. NEWSLETTER SUBSCRIBERS
create table public.newsletter_subscribers (
    id uuid default uuid_generate_v4() primary key,
    email text unique not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. EMAILED RESULTS REQUESTS
create table public.emailed_results (
    id uuid default uuid_generate_v4() primary key,
    email text not null,
    calculator_id uuid references public.calculators(id) on delete cascade not null,
    inputs jsonb not null,
    outputs jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS FOR NEW TABLES
alter table public.newsletter_subscribers enable row level security;
alter table public.emailed_results enable row level security;

create policy "Allow public insert to newsletter_subscribers" on public.newsletter_subscribers 
    for insert with check (true);

create policy "Allow public insert to emailed_results" on public.emailed_results 
    for insert with check (true);
