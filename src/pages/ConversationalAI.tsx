
import VoiceInterface from "@/components/conversational-ai/VoiceInterface";

const ConversationalAI = () => {
    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 bg-background h-full">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Conversational AI</h1>
            </header>
            <div className="flex-1 flex flex-col bg-card p-6 rounded-lg border overflow-hidden">
                <VoiceInterface />
            </div>
        </div>
    );
};

export default ConversationalAI;
