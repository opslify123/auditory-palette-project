
import { useState } from 'react';
import { useConversation } from '@11labs/react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff, Bot, Loader2 } from 'lucide-react';

const VoiceInterface = () => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<any[]>([]);
    const [isConnecting, setIsConnecting] = useState(false);

    const conversation = useConversation({
        onMessage: (msg) => {
            console.log('Message received:', msg);
            setMessages((prev) => [...prev, msg]);
        },
        onError: (err: any) => {
            console.error(err);
            toast({
                title: "Conversation Error",
                description: err.message || "An unknown error occurred.",
                variant: "destructive",
            });
        },
    });

    const startSession = async () => {
        setIsConnecting(true);
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            const { data, error } = await supabase.functions.invoke('get-elevenlabs-signed-url');
            if (error) throw error;
            if (data.error) throw new Error(data.error);

            if (data.url) {
                await conversation.start({ signedUrl: data.url });
            } else {
                throw new Error("Could not get signed URL.");
            }
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Error starting conversation",
                description: error.message || "Please check browser permissions and API configuration.",
                variant: "destructive",
            });
        } finally {
            setIsConnecting(false);
        }
    };

    const endSession = async () => {
        await conversation.stop();
        setMessages([]);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                 {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <Bot size={48} />
                        <p className="mt-4 text-lg text-center">Press the microphone to start a conversation with the AI.</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 rounded-lg bg-muted">
                        <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(msg, null, 2)}</pre>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t flex flex-col items-center justify-center space-y-4">
                 <div className="flex items-center justify-center space-x-4">
                    {conversation.status === 'connected' ? (
                        <Button onClick={endSession} variant="destructive" size="lg" className="rounded-full w-20 h-20">
                            <MicOff className="h-8 w-8" />
                        </Button>
                    ) : (
                        <Button onClick={startSession} size="lg" className="rounded-full w-20 h-20" disabled={isConnecting}>
                            {isConnecting ? <Loader2 className="animate-spin h-8 w-8" /> : <Mic className="h-8 w-8" />}
                        </Button>
                    )}
                 </div>
                 {conversation.isSpeaking && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Bot className="h-5 w-5 animate-pulse" />
                        <span>AI is speaking...</span>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default VoiceInterface;
