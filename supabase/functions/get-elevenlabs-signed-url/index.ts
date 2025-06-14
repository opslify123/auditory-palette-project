
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY')
// IMPORTANT: Replace this with your own Agent ID from ElevenLabs
const AGENT_ID = 'agent_01jxrca0g8fgqrrc34xt0q3m9d'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (!ELEVENLABS_API_KEY) {
    return new Response(JSON.stringify({ error: 'ElevenLabs API key is not set' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  if (AGENT_ID === 'YOUR_ELEVENLABS_AGENT_ID') {
    return new Response(JSON.stringify({ error: 'ElevenLabs Agent ID is not set. Please configure it in the Edge Function at supabase/functions/get-elevenlabs-signed-url/index.ts' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('xi-api-key', ELEVENLABS_API_KEY)

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`,
      {
        method: 'GET',
        headers: requestHeaders,
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)
      throw new Error(`ElevenLabs API error: ${response.statusText}`)
    }

    const { signed_url } = await response.json()

    return new Response(JSON.stringify({ url: signed_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error getting signed URL:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
