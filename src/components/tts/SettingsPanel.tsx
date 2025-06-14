
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, History } from 'lucide-react';
import HistoryPanel from './HistoryPanel';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '@/components/ui/button';

const SettingsPanel = () => {
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
          <p>Voice settings will be here.</p>
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
