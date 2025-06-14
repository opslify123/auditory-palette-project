
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, History } from 'lucide-react';
import HistoryPanel from './HistoryPanel';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { voices } from '@/lib/voices';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SettingsPanelProps {
  selectedVoiceId: string;
  setSelectedVoiceId: (id: string) => void;
  stability: number;
  setStability: (value: number) => void;
  similarityBoost: number;
  setSimilarityBoost: (value: number) => void;
  style: number;
  setStyle: (value: number) => void;
  useSpeakerBoost: boolean;
  setUseSpeakerBoost: (value: boolean) => void;
}

const SettingsPanel = ({ 
  selectedVoiceId, 
  setSelectedVoiceId,
  stability,
  setStability,
  similarityBoost,
  setSimilarityBoost,
  style,
  setStyle,
  useSpeakerBoost,
  setUseSpeakerBoost
}: SettingsPanelProps) => {
  const { signOut } = useAuth();
  return (
    <aside className="w-full md:w-96 bg-card border-l flex flex-col">
      <Tabs defaultValue="settings" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">
            <Settings className="mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2" />
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="settings" className="flex-1">
            <ScrollArea className="h-full p-4">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Voice Settings</h3>
                        <div className="space-y-2">
                        <Label htmlFor="voice">Voice</Label>
                        <Select value={selectedVoiceId} onValueChange={setSelectedVoiceId}>
                            <SelectTrigger id="voice">
                            <SelectValue placeholder="Select a voice" />
                            </SelectTrigger>
                            <SelectContent>
                            {voices.map((voice) => (
                                <SelectItem key={voice.id} value={voice.id}>
                                {voice.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Voice Effects</h3>
                        <div className="space-y-2">
                            <Label>Stability: {Math.round(stability * 100)}%</Label>
                            <Slider value={[stability]} onValueChange={([val]) => setStability(val)} min={0} max={1} step={0.01} />
                            <p className="text-xs text-muted-foreground">More stable is more monotonic, less stable is more expressive.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Similarity Boost: {Math.round(similarityBoost * 100)}%</Label>
                            <Slider value={[similarityBoost]} onValueChange={([val]) => setSimilarityBoost(val)} min={0} max={1} step={0.01} />
                            <p className="text-xs text-muted-foreground">Higher values make the voice more similar to the original.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Style Exaggeration: {Math.round(style * 100)}%</Label>
                            <Slider value={[style]} onValueChange={([val]) => setStyle(val)} min={0} max={1} step={0.01} />
                            <p className="text-xs text-muted-foreground">Higher values make the voice more expressive and stylistic.</p>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                            <Switch id="speaker-boost" checked={useSpeakerBoost} onCheckedChange={setUseSpeakerBoost} />
                            <Label htmlFor="speaker-boost">Use Speaker Boost</Label>
                        </div>
                        <p className="text-xs text-muted-foreground">Boosts the similarity of the synthesized speech to the original speaker.</p>
                    </div>
                </div>
            </ScrollArea>
        </TabsContent>
        <TabsContent value="history" className="flex-1">
          <HistoryPanel />
        </TabsContent>
      </Tabs>
      <div className="p-4 border-t">
        <Button onClick={() => signOut()} variant="outline" className="w-full">
          Log Out
        </Button>
      </div>
    </aside>
  );
};

export default SettingsPanel;
