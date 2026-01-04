import React from 'react';
import Header from './Header';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout component provides the consistent structure for the application:
 * Fixed Header, Left Sidebar, Central Content Area, and Right Sidebar.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    // Outer container: sets background and ensures minimum screen height
    <div className="min-h-screen bg-gray-100">
      
      {/* 1. Fixed Header */}
      <Header />

      {/* 2. Main Content Wrapper */}
      {/* pt-14/pt-16 offsets the height of the fixed header */}
      <div className="pt-14 lg:pt-16"> 
        
        {/* Centered container for maximum content width */}
        <div className="mx-auto max-w-screen-xl 2xl:max-w-screen-2xl p-0 md:px-4">
          
          {/* Main Grid Layout: 12 columns total on large screens */}
          {/* gap-4 for mobile spacing, increased gap-8 for desktop aesthetic */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            
            {/* A. Left Sidebar (3 columns) */}
            {/* Hidden on small screens, displayed on large screens (lg) */}
            <aside className="hidden lg:col-span-3 lg:block">
              {/* Sticky positioning to keep sidebar visible while main content scrolls */}
              <div className="sticky top-16 pt-4">
                <SidebarLeft />
              </div>
            </aside>

            {/* B. Central Content Area (Feed / Page Content) */}
            {/* Takes full width on mobile (col-span-full) 
               Takes 9 columns on LG (to maximize feed space if no right sidebar)
               Takes 6 columns on XL (standard feed width) */}
            <main className="col-span-full lg:col-span-9 xl:col-span-6 py-4">
              {children}
            </main>

            {/* C. Right Sidebar (3 columns) */}
            {/* Hidden until extra large screens (xl) */}
            <aside className="hidden xl:col-span-3 xl:block">
              {/* Sticky positioning */}
              <div className="sticky top-16 pt-4">
                <SidebarRight />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;