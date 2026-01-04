import React from 'react';
import { 
    Users, 
    Group, 
    Store, 
    Tv2, 
    Clock4, 
    Bookmark, 
    ChevronDown,
    Calendar,
    Settings,
    HelpCircle,
    MonitorPlay
} from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../hooks/useAuth';

// --- MOCK/HELPER DATA ---

// This structure usually holds standard FB navigation items
const primaryNavigationItems = [
    { label: 'Friends', Icon: Users, href: '/friends', color: 'text-blue-600' },
    { label: 'Watch', Icon: MonitorPlay, href: '/watch', color: 'text-blue-500' },
    { label: 'Groups', Icon: Group, href: '/groups', color: 'text-purple-600' },
    { label: 'Marketplace', Icon: Store, href: '/marketplace', color: 'text-green-500' },
    { label: 'Memories', Icon: Clock4, href: '/memories', color: 'text-yellow-600' },
    { label: 'Saved', Icon: Bookmark, href: '/saved', color: 'text-purple-500' },
    { label: 'Events', Icon: Calendar, href: '/events', color: 'text-red-500' },
];

interface NavItemProps {
    Icon: React.ElementType;
    label: string;
    href: string;
    iconColorClass?: string;
}

const NavItem: React.FC<NavItemProps> = ({ Icon, label, href, iconColorClass = 'text-blue-500' }) => (
    <a 
        href={href} 
        className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition duration-150 cursor-pointer text-gray-800"
    >
        <Icon className={`w-6 h-6 mr-3 ${iconColorClass}`} />
        <span className="text-sm font-medium">{label}</span>
    </a>
);

const SidebarLeft: React.FC = () => {
    // Attempt to load user data from context/hook
    const { user } = useAuth() || {}; 

    // Placeholder data if context is not fully implemented or user is logged out (shouldn't happen in this sidebar)
    const currentUser = user || { 
        id: 'mock-1', 
        name: 'Jane Doe', 
        profilePictureUrl: 'https://i.pravatar.cc/150?img=5' 
    };

    return (
        // Fixed positioning relative to the MainLayout content area
        // Only visible on large screens (lg)
        <div className="hidden lg:block w-64 xl:w-72 fixed top-14 left-0 h-[calc(100vh-56px)] overflow-y-auto pt-4 px-2 bg-white z-10 custom-scrollbar">
            
            {/* User Profile Link (Always at the top) */}
            <div className="mb-2">
                <a 
                    href="/profile/me" 
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition duration-150 cursor-pointer"
                >
                    <Avatar 
                        src={currentUser.profilePictureUrl} 
                        alt={currentUser.name} 
                        size="md" 
                        className="mr-3" 
                    />
                    <span className="text-sm font-semibold">{currentUser.name}</span>
                </a>
            </div>

            {/* Primary Navigation Section */}
            <div className="pb-3 border-b border-gray-200">
                {primaryNavigationItems.slice(0, 6).map((item) => (
                    <NavItem 
                        key={item.label} 
                        Icon={item.Icon} 
                        label={item.label} 
                        href={item.href} 
                        iconColorClass={item.color}
                    />
                ))}

                {/* See More Toggle */}
                <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition duration-150 cursor-pointer text-gray-800">
                    <div className="w-8 h-8 mr-2 bg-gray-200 rounded-full flex items-center justify-center">
                        <ChevronDown className="w-5 h-5 text-gray-800" />
                    </div>
                    <span className="text-sm font-medium">See more</span>
                </div>
            </div>

            {/* Shortcuts Section */}
            <div className="pt-3 pb-3 border-b border-gray-200">
                <h3 className="text-xs font-semibold text-gray-500 uppercase px-2 mb-2">Your shortcuts</h3>
                
                {/* Mock Shortcut 1: Group */}
                <a 
                    href="/groups/mock-group-1"
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition duration-150 cursor-pointer text-gray-800"
                >
                    <Avatar 
                        src="https://i.pravatar.cc/150?img=60" 
                        alt="Design Group" 
                        size="sm" 
                        className="mr-3" 
                    />
                    <span className="text-sm font-medium truncate">UI/UX Design Community</span>
                </a>

                {/* Mock Shortcut 2: Page */}
                <a 
                    href="/pages/mock-page-2"
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition duration-150 cursor-pointer text-gray-800"
                >
                    <Avatar 
                        src="https://i.pravatar.cc/150?img=65" 
                        alt="Local News" 
                        size="sm" 
                        className="mr-3" 
                    />
                    <span className="text-sm font-medium truncate">Local News & Alerts</span>
                </a>
            </div>

            {/* Help and Support Footer Links */}
            <div className="pt-3 pb-16">
                <NavItem Icon={Settings} label="Settings & Privacy" href="/settings" iconColorClass="text-gray-500" />
                <NavItem Icon={HelpCircle} label="Help & Support" href="/help" iconColorClass="text-gray-500" />
            </div>

            {/* Policy Footer */}
            <div className="absolute bottom-0 w-full bg-white text-xs text-gray-500 p-3">
                <p className="px-1 leading-relaxed">
                    <a href="#" className="hover:underline">Privacy</a> · 
                    <a href="#" className="hover:underline">Terms</a> · 
                    <a href="#" className="hover:underline">Advertising</a> · 
                    <a href="#" className="hover:underline">Cookies</a> · 
                    More · Clone © 2024
                </p>
            </div>
        </div>
    );
};

export default SidebarLeft;