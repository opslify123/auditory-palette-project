import { useState } from 'react';
import TTS_Content from '@/components/tts/TTS_Content';
import SettingsPanel from '@/components/tts/SettingsPanel';
import { voices } from '@/lib/voices';

const Index = () => {
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(voices[0].id);
  const [stability, setStability] = useState(0.5);
  const [similarityBoost, setSimilarityBoost] = useState(0.75);
  const [style, setStyle] = useState(0);
  const [useSpeakerBoost, setUseSpeakerBoost] = useState(true);

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-full">
      <TTS_Content 
        selectedVoiceId={selectedVoiceId}
        stability={stability}
        similarityBoost={similarityBoost}
        style={style}
        useSpeakerBoost={useSpeakerBoost}
      />
      <SettingsPanel 
        selectedVoiceId={selectedVoiceId} 
        setSelectedVoiceId={setSelectedVoiceId} 
        stability={stability}
        setStability={setStability}
        similarityBoost={similarityBoost}
        setSimilarityBoost={setSimilarityBoost}
        style={style}
        setStyle={setStyle}
        useSpeakerBoost={useSpeakerBoost}
        setUseSpeakerBoost={setUseSpeakerBoost}
      />
    </div>
  );
};

export default Index;
