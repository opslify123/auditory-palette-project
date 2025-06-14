
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TTS_Content from '@/components/tts/TTS_Content';
import SettingsPanel from '@/components/tts/SettingsPanel';
import { voices } from '@/lib/voices';

const Index = () => {
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(voices[0].id);

  return (
    <div className="flex h-full w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <TTS_Content selectedVoiceId={selectedVoiceId} />
        <SettingsPanel 
          selectedVoiceId={selectedVoiceId} 
          setSelectedVoiceId={setSelectedVoiceId} 
        />
      </div>
    </div>
  );
};

export default Index;
