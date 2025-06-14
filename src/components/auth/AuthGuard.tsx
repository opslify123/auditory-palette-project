
import { useAuth } from '@/contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
