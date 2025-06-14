
import VoiceInterface from "@/components/conversational-ai/VoiceInterface";

const ConversationalAI = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground p-4">
      <h1 className="text-3xl font-bold mb-8">Conversational AI</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">
        Engage in a natural conversation with our AI. Click the button below to start. You will need to grant microphone permissions.
      </p>
      <VoiceInterface />
    </div>
  );
};

export default ConversationalAI;
