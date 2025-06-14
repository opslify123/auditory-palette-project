
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Play, Pause } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from 'date-fns';

type SpeechHistoryItem = {
    id: string;
    created_at: string;
    text: string;
    audio_url: string;
};

const HistoryPanel = () => {
    const [history, setHistory] = useState<SpeechHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [playingAudio, setPlayingAudio] = useState<{ audio: HTMLAudioElement; url: string } | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('speech_history')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching speech history:', error);
                toast({
                    title: "Error",
                    description: "Could not fetch speech history.",
                    variant: "destructive",
                });
            } else {
                setHistory(data);
            }
            setLoading(false);
        };
        fetchHistory();

        return () => {
            if (playingAudio) {
                playingAudio.audio.pause();
            }
        };
    }, [toast]);

    const handlePlayToggle = (audioUrl: string) => {
        if (playingAudio && playingAudio.url === audioUrl) {
            playingAudio.audio.pause();
            setPlayingAudio(null);
        } else {
            if (playingAudio) {
                playingAudio.audio.pause();
            }
            const audio = new Audio(audioUrl);
            audio.play();
            setPlayingAudio({ audio, url: audioUrl });
            audio.onended = () => {
                setPlayingAudio(null);
            };
        }
    };

    const handleDownload = (audioUrl: string) => {
        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = `speech_${new Date().getTime()}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    
    if (loading) {
        return <div className="text-center p-4">Loading history...</div>;
    }

    if (history.length === 0) {
        return <div className="text-center p-4 text-muted-foreground">No history found.</div>;
    }

    return (
        <ScrollArea className="h-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {history.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className="font-medium max-w-[180px] truncate" title={item.text}>{item.text}</div>
                                <div className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</div>
                            </TableCell>
                            <TableCell className="text-right space-x-1">
                                <Button variant="ghost" size="icon" onClick={() => handlePlayToggle(item.audio_url)}>
                                    {playingAudio?.url === item.audio_url ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDownload(item.audio_url)}>
                                    <Download className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default HistoryPanel;
