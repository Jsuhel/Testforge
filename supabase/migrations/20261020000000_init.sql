-- TestForge.Ai demo requests — table, policies and documents bucket.
-- Applied with `supabase db push` after the project exists.

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  mobile text not null check (char_length(mobile) between 7 and 20),
  remarks text not null default '' check (char_length(remarks) <= 1000),
  document_path text
);

alter table public.demo_requests enable row level security;

-- Anonymous visitors may only insert rows — no reads, no updates, no deletes.
create policy "anon can insert demo requests"
  on public.demo_requests
  for insert
  to anon
  with check (true);

-- Documents bucket: private, 5 MB cap, document mime types only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'documents',
  'documents',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/markdown',
    'text/plain'
  ]
)
on conflict (id) do nothing;

-- Anonymous visitors may upload into the documents bucket — nothing else.
create policy "anon can upload documents"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'documents');
