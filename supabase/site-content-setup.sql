-- NAD Furniture editable page content setup
-- Run once in Supabase SQL Editor. This does not modify nad_products or existing product images.

create table if not exists public.nad_site_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.nad_site_content enable row level security;\ngrant select on public.nad_site_content to anon, authenticated;\ngrant insert, update on public.nad_site_content to authenticated;

drop policy if exists "Public can read NAD site content" on public.nad_site_content;
create policy "Public can read NAD site content"
  on public.nad_site_content for select
  using (true);

drop policy if exists "NAD owners can insert site content" on public.nad_site_content;
create policy "NAD owners can insert site content"
  on public.nad_site_content for insert
  to authenticated
  with check (
    exists (
      select 1 from public.nad_site_owners o
      where o.user_id = auth.uid()
    )
  );

drop policy if exists "NAD owners can update site content" on public.nad_site_content;
create policy "NAD owners can update site content"
  on public.nad_site_content for update
  to authenticated
  using (
    exists (
      select 1 from public.nad_site_owners o
      where o.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.nad_site_owners o
      where o.user_id = auth.uid()
    )
  );

-- Ensure the existing NAD image bucket is available for page-photo uploads.
insert into storage.buckets (id, name, public)
values ('nad-site-images', 'nad-site-images', true)
on conflict (id) do update set public = true;

drop policy if exists "NAD owners can upload site images" on storage.objects;
create policy "NAD owners can upload site images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'nad-site-images'
    and exists (
      select 1 from public.nad_site_owners o
      where o.user_id = auth.uid()
    )
  );

drop policy if exists "NAD owners can update site images" on storage.objects;
create policy "NAD owners can update site images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'nad-site-images'
    and exists (
      select 1 from public.nad_site_owners o
      where o.user_id = auth.uid()
    )
  )
  with check (
    bucket_id = 'nad-site-images'
    and exists (
      select 1 from public.nad_site_owners o
      where o.user_id = auth.uid()
    )
  );

drop policy if exists "NAD owners can delete site images" on storage.objects;
create policy "NAD owners can delete site images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'nad-site-images'
    and exists (
      select 1 from public.nad_site_owners o
      where o.user_id = auth.uid()
    )
  );


-- Allow direct owner video uploads up to 100 MB in the same public media bucket.
-- Existing owner-only storage policies above also protect video uploads/deletes.
update storage.buckets
set file_size_limit = 104857600,
    allowed_mime_types = array[
      'image/jpeg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'
    ]
where id = 'nad-site-images';
