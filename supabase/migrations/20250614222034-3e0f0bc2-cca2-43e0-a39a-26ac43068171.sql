
-- Create a storage bucket for audio files if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio_files', 'audio_files', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for public access to the audio_files bucket.
-- For a production app, you'd want more restrictive policies.
-- We drop and recreate policies to ensure they are correctly set up.

DROP POLICY IF EXISTS "Public read access for audio_files" ON storage.objects;
CREATE POLICY "Public read access for audio_files" ON storage.objects
FOR SELECT USING (bucket_id = 'audio_files');

DROP POLICY IF EXISTS "Public insert for audio_files" ON storage.objects;
CREATE POLICY "Public insert for audio_files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'audio_files');

DROP POLICY IF EXISTS "Public update for audio_files" ON storage.objects;
CREATE POLICY "Public update for audio_files" ON storage.objects
FOR UPDATE USING (bucket_id = 'audio_files');

DROP POLICY IF EXISTS "Public delete for audio_files" ON storage.objects;
CREATE POLICY "Public delete for audio_files" ON storage.objects
FOR DELETE USING (bucket_id = 'audio_files');


-- Create a table to store the history of generated speech
CREATE TABLE IF NOT EXISTS public.speech_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security and allow public access for demonstration.
-- In a real app, you would restrict access to authenticated users.
ALTER TABLE public.speech_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public access for speech_history" ON public.speech_history;
CREATE POLICY "Public access for speech_history"
ON public.speech_history
FOR ALL
USING (true)
WITH CHECK (true);
