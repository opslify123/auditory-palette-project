
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (!ELEVENLABS_API_KEY) {
    console.error('Error: ELEVENLABS_API_KEY is not set in the Supabase environment secrets.')
    return new Response(
      JSON.stringify({ error: 'Server configuration error: The API key is missing.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  )

  try {
    const { text, voiceId, voiceSettings } = await req.json()

    if (!text) {
      throw new Error('Text is required')
    }
    
    const selectedVoiceId = voiceId || 'EXAVITQu4vr4xnSDxMaL'; // Sarah's Voice ID

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: voiceSettings?.stability ?? 0.5,
          similarity_boost: voiceSettings?.similarity_boost ?? 0.75,
          style: voiceSettings?.style ?? 0,
          use_speaker_boost: voiceSettings?.use_speaker_boost ?? true,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)
      let errorMessage = `ElevenLabs API error: ${response.statusText}`
      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.detail?.message) {
          errorMessage = errorJson.detail.message
        } else {
          errorMessage = `ElevenLabs API error: ${response.statusText} - ${errorText}`
        }
      } catch (e) {
        errorMessage = `ElevenLabs API error: ${response.statusText} - ${errorText}`
      }
      throw new Error(errorMessage)
    }

    const audioBlob = await response.blob()

    // Upload to storage and save history
    const fileName = `speech_${Date.now()}.mp3`;
    const { error: uploadError } = await supabase.storage
      .from('audio_files')
      .upload(fileName, audioBlob, {
        contentType: 'audio/mpeg',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError.message);
    } else {
      const { data: urlData } = supabase.storage
        .from('audio_files')
        .getPublicUrl(fileName);

      if (urlData.publicUrl) {
        const { error: historyError } = await supabase
          .from('speech_history')
          .insert({ text: text, audio_url: urlData.publicUrl });

        if (historyError) {
          console.error('Error saving to history:', historyError.message);
        }
      }
    }

    const audioBuffer = await audioBlob.arrayBuffer()
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(audioBuffer))
    )

    return new Response(JSON.stringify({ audioContent: base64Audio }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error in text-to-speech function:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
