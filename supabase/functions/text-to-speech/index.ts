
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

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

  try {
    const { text, voiceId } = await req.json()

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
          stability: 0.5,
          similarity_boost: 0.75,
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
