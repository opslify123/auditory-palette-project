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

interface SettingsPanelProps {
  selectedVoiceId: string;
  setSelectedVoiceId: (id: string) => void;
}

const SettingsPanel = ({ selectedVoiceId, setSelectedVoiceId }: SettingsPanelProps) => {
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
        <TabsContent value="settings" className="flex-1 p-4">
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
