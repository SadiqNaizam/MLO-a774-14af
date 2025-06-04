import React from 'react';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  className
}) => {
  // This layout provides a full-screen, centered container for authentication pages.
  // It sets the background color and uses flexbox to position its children (e.g., a login form card)
  // in the center of the viewport.
  // Responsive padding is added to ensure content doesn't touch screen edges on smaller devices.

  return (
    <main
      className={cn(
        'flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 md:p-8',
        className
      )}
    >
      {children}
    </main>
  );
};

export default AuthLayout;
