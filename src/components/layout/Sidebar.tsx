
import { Home, MessageSquare, Play, Wand2, Music, BookOpen, Sparkles, Radio, Bell, Bolt, User, ChevronDown, Plus, ChevronsLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const menuItems = {
    main: [
      { icon: Home, label: 'Home' },
      { icon: MessageSquare, label: 'Voices' },
    ],
    playground: [
      { icon: Play, label: 'Text to Speech' },
      { icon: Wand2, label: 'Voice Changer' },
      { icon: Music, label: 'Sound Effects' },
    ],
    products: [
      { icon: BookOpen, label: 'Studio' },
      { icon: Sparkles, label: 'Dubbing' },
      { icon: Radio, label: 'Conversational AI' },
    ],
  };

  return (
    <aside className="w-64 bg-[#19191D] text-white p-4 flex-col hidden md:flex">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
            <span className="text-xl font-bold">Opslify AI</span>
        </div>
        <Button variant="ghost" size="icon">
            <ChevronsLeftRight className="h-4 w-4" />
        </Button>
      </div>

      <nav className="flex-1 space-y-4">
        <div>
          {menuItems.main.map((item, index) => (
            <a key={index} href="#" className="flex items-center p-2 text-sm text-gray-300 rounded-md hover:bg-gray-700">
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
              {item.label === 'Voices' && <Plus className="w-4 h-4 ml-auto" />}
            </a>
          ))}
        </div>
        
        <div>
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Playground</h3>
          {menuItems.playground.map((item, index) => (
            <a key={index} href="#" className={`flex items-center p-2 text-sm rounded-md ${item.label === 'Text to Speech' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </a>
          ))}
        </div>

        <div>
          <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Products</h3>
          {menuItems.products.map((item, index) => (
            <a key={index} href="#" className="flex items-center p-2 text-sm text-gray-300 rounded-md hover:bg-gray-700">
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </a>
          ))}
        </div>
        
      </nav>

      <div className="mt-auto">
        <Button variant="secondary" className="w-full justify-center bg-gray-700 hover:bg-gray-600">
            <Bolt className="w-4 h-4 mr-2" /> Upgrade
        </Button>
        <div className="flex items-center mt-4 p-2">
          <User className="w-8 h-8 rounded-full bg-gray-600 p-1" />
          <div className="ml-3">
            <p className="text-sm font-medium">My Workspace</p>
          </div>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
