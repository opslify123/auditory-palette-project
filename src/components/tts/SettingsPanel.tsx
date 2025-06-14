
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from '@/components/ui/card';
import { Info, ChevronRight, RefreshCw } from 'lucide-react';
import HistoryPanel from './HistoryPanel';

const SettingsPanel = () => {
    const [activeTab, setActiveTab] = useState('settings');

    return (
        <aside className="w-full md:w-80 bg-card border-l p-6 hidden md:flex flex-col">
            <div className="flex items-center space-x-4 mb-6">
                <Button 
                    variant="ghost"
                    onClick={() => setActiveTab('settings')}
                    className={`font-semibold pb-2 ${activeTab === 'settings' ? 'text-white border-b-2 border-white' : 'text-muted-foreground'}`}
                >
                    Settings
                </Button>
                <Button 
                    variant="ghost"
                    onClick={() => setActiveTab('history')}
                    className={`font-semibold pb-2 ${activeTab === 'history' ? 'text-white border-b-2 border-white' : 'text-muted-foreground'}`}
                >
                    History
                </Button>
            </div>

            {activeTab === 'settings' ? (
                <div className="space-y-6 flex-1 flex flex-col">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Voice</h3>
                        <Button variant="outline" className="w-full justify-between items-center bg-secondary">
                            <span>Sarah</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Model</h3>
                        <Button variant="outline" className="w-full justify-between items-center bg-secondary ring-1 ring-pink-500/50">
                            <div className="flex items-center">
                                <span className="text-xs bg-gray-600 rounded-sm px-1 py-0.5 mr-2">V3</span>
                                <span>Eleven v3 (alpha)</span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <Card className="bg-secondary border-blue-500/50">
                        <CardContent className="pt-6 text-sm text-muted-foreground">
                            <div className="flex">
                                <Info className="h-4 w-4 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                                <div>
                                    <span className="font-bold text-foreground">This model is a research preview</span>
                                    <p>It's the most expressive Text to Speech model but requires more prompt engineering.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Stability</h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Creative</span>
                            <span>Robust</span>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
                    </div>
                    <div className="mt-auto flex justify-end">
                        <Button variant="ghost" className="text-muted-foreground">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reset values
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    <HistoryPanel />
                </div>
            )}
        </aside>
    );
}

export default SettingsPanel;
