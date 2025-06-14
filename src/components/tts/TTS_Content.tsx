
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from "@/components/ui/badge"

const TTS_Content = () => {
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
                         Rachel
                       </Badge>
                    </div>
                </div>

                <Textarea 
                    placeholder="Start typing here or paste any text you want to turn into lifelike speech..."
                    className="flex-1 w-full p-4 bg-transparent border-0 text-lg resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                        {/* Placeholder for credits */}
                    </div>
                    <Button size="lg" className="bg-gray-300 text-black hover:bg-white">Generate speech</Button>
                </div>
            </div>
        </div>
    );
}

export default TTS_Content;
