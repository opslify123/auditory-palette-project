
import { useConversation } from "@11labs/react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const VoiceInterface = () => {
  const { startSession, endSession, status } = useConversation({
    agentId: "2a7522ANd2N55s2EwS27WsoU", // Replace with your agent ID from ElevenLabs
    onMessage: (message) => {
      console.log(message);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleToggleConversation = async () => {
    if (status === 'connected') {
      await endSession();
    } else {
      try {
        // Request microphone access
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await startSession();
      } catch (error) {
        console.error("Microphone access denied:", error);
        alert("Microphone access is required to start the conversation.");
      }
    }
  };
  
  const getButtonClass = () => {
    if (status === "connected") {
      return "bg-red-500 hover:bg-red-600";
    }
    return "bg-blue-500 hover:bg-blue-600";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={handleToggleConversation}
        className={`w-24 h-24 rounded-full flex items-center justify-center text-white transition-colors ${getButtonClass()}`}
        aria-label={status === 'connected' ? "Stop conversation" : "Start conversation"}
      >
        <Mic size={48} />
      </Button>
      <p className="text-muted-foreground capitalize">Status: {status}</p>
    </div>
  );
};

export default VoiceInterface;
