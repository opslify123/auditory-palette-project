
import Sidebar from '@/components/layout/Sidebar';
import TTS_Content from '@/components/tts/TTS_Content';
import SettingsPanel from '@/components/tts/SettingsPanel';

const Index = () => {
  return (
    <div className="flex h-full w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <TTS_Content />
        <SettingsPanel />
      </div>
    </div>
  );
};

export default Index;
