
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import StudioHistoryTable from '@/components/studio/StudioHistoryTable';
import { Skeleton } from '@/components/ui/skeleton';

const fetchHistory = async () => {
    const { data, error } = await supabase
        .from('speech_history')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

const Studio = () => {
    const { data: history, isLoading, error } = useQuery({
        queryKey: ['speech_history'], 
        queryFn: fetchHistory
    });

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 bg-background h-full">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Studio</h1>
            </header>
            <div className="flex-1 flex flex-col bg-card p-6 rounded-lg border overflow-auto">
                {isLoading && (
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                )}
                {error && <p className="text-destructive">Error loading history: {error.message}</p>}
                {history && <StudioHistoryTable history={history} />}
            </div>
        </div>
    );
};

export default Studio;
