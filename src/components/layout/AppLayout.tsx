
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';

const AppLayout = () => {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
