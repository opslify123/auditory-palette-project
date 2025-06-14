
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const TTS_Content = () => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerateSpeech = async () => {
        if (!text.trim()) {
            toast({
                title: "Error",
                description: "Please enter some text to generate speech.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.functions.invoke('text-to-speech', {
                body: { text: text, voiceId: 'EXAVITQu4vr4xnSDxMaL' }, // Using Sarah's voice ID for consistency
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            if (data.audioContent) {
                const audio = new Audio(`data:audio/mpeg;base64,${data.audioContent}`);
                audio.play();
            } else {
                 throw new Error("No audio content received from the server.");
            }
        } catch (error: any) {
            console.error('Error generating speech:', error);
            toast({
                title: "Error Generating Speech",
                description: error.message || "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 bg-background">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Text to Speech</h1>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">Feedback</Button>
                    <Button variant="outline">Documentation</Button>
                    <Button variant="default" className="bg-primary">Talk to El</Button>
                </div>
            </header>

            <div className="flex-1 flex flex-col bg-card p-6 rounded-lg border">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center text-sm">
                       <Badge variant="default" className="bg-primary/20 text-primary border-primary/30">
                         <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                         </span>
                         Sarah
                       </Badge>
                    </div>
                </div>

                <Textarea 
                    placeholder="Start typing here or paste any text you want to turn into lifelike speech..."
                    className="flex-1 w-full p-4 bg-transparent border-0 text-lg resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                        {/* Placeholder for credits */}
                    </div>
                    <Button 
                        size="lg" 
                        onClick={handleGenerateSpeech} 
                        disabled={isLoading || !text.trim()}
                        className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-300 disabled:text-black"
                    >
                        {isLoading ? 'Generating...' : 'Generate speech'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TTS_Content;
