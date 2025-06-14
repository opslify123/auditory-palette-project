
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Download, PlayCircle, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type SpeechHistoryItem = {
    id: string;
    created_at: string;
    text: string;
    audio_url: string;
};

interface StudioHistoryTableProps {
    history: SpeechHistoryItem[];
}

const StudioHistoryTable = ({ history }: StudioHistoryTableProps) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async (item: SpeechHistoryItem) => {
            const fileName = item.audio_url.split('/').pop();
            
            if (fileName) {
                const { error: storageError } = await supabase.storage.from('audio_files').remove([fileName]);
                if (storageError && storageError.message !== 'The resource was not found') {
                    // We can log storage error but proceed to delete from DB
                    console.error("Storage deletion error:", storageError.message);
                }
            }
            
            const { error: dbError } = await supabase.from('speech_history').delete().match({ id: item.id });
            if (dbError) {
                throw new Error(dbError.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['speech_history'] });
            toast({
                title: "Success",
                description: "History item deleted.",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `Failed to delete item: ${error.message}`,
                variant: "destructive",
            });
        }
    });

    const playAudio = (audioUrl: string) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    const downloadAudio = (audioUrl: string, text: string) => {
        const link = document.createElement('a');
        link.href = audioUrl;
        const safeFileName = text.substring(0, 20).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.download = `${safeFileName || 'speech'}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (history.length === 0) {
        return <div className="text-center text-muted-foreground pt-10">No speech history found. Generate some speech to see it here.</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Text</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium max-w-sm truncate" title={item.text}>{item.text}</TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                        <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => playAudio(item.audio_url)}>
                                <PlayCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => downloadAudio(item.audio_url, item.text)}>
                                <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item)} disabled={deleteMutation.isPending}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
};

export default StudioHistoryTable;
