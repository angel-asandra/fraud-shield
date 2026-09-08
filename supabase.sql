-- Create the bucket
insert into storage.buckets (id, name, public)
values ('evidence-files', 'evidence-files', true);

-- Allow anyone to upload
create policy "public can upload evidence"
  on storage.objects for insert
  with check (bucket_id = 'evidence-files');

-- Allow anyone to read
create policy "public can read evidence"
  on storage.objects for select
  using (bucket_id = 'evidence-files');