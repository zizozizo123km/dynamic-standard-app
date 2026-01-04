import React from 'react';
import {
    Home,
    Search,
    MonitorPlay,
    Users,
    Bell,
    MessageCircle,
    LayoutGrid,
    ChevronDown,
    UserRound,
} from 'lucide-react';
import Avatar from '../ui/Avatar'; // Assuming Avatar component exists and handles sizing/display

// --- Helper Components ---

interface NavIconProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

/**
 * Component for the central navigation icons. Simulates Facebook's centered nav style.
 */
const NavigationIcon: React.FC<NavIconProps> = ({ icon, label, isActive, onClick }) => (
    <div
        className={`relative flex items-center justify-center h-full cursor-pointer transition-colors duration-200 
            ${isActive 
                ? 'text-blue-600 border-b-4 border-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }
            px-4 sm:px-6 lg:px-10 group
        `}
        onClick={onClick}
        title={isActive ? `Current Page: ${label}` : `Go to ${label}`}
    >
        <div className={`p-2 rounded-lg ${isActive ? '' : 'group-hover:text-gray-700'}`}>
            {icon}
        </div>
        {/* Optional: Hover tooltip/indicator */}
        {!isActive && (
             <span className="hidden md:group-hover:block absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300"></span>
        )}
    </div>
);

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    hasNotification?: boolean;
}

/**
 * Component for circular action buttons (Menu, Messenger, Notifications).
 */
const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, hasNotification = false }) => (
    <button
        className="relative w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-150 text-gray-800 shrink-0"
        onClick={onClick}
        aria-label={label}
        title={label}
    >
        {icon}
        {hasNotification && (
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"></span>
        )}
    </button>
);


const Header = () => {
    // State to simulate active navigation item
    const [activeNav, setActiveNav] = React.useState('Home');

    const currentUser = {
        name: "JD",
        avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026703b", 
        hasNotifications: true,
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 h-16 flex items-center justify-between px-2 sm:px-4 lg:px-6">
            
            {/* ------------------------- Left Section (Logo & Search) ------------------------- */}
            <div className="flex items-center space-x-2 min-w-[150px]">
                {/* Facebook Logo (Blue F or similar) */}
                <div className="text-3xl font-bold text-blue-600 cursor-pointer select-none">
                    F
                </div>
                
                {/* Search Bar (Desktop/Tablet visible) */}
                <div className="relative hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-[240px] transition-shadow duration-150">
                    <Search className="w-5 h-5 text-gray-500 mr-2 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search Facebook"
                        className="bg-transparent focus:outline-none text-sm w-full placeholder-gray-500"
                        aria-label="Search field"
                    />
                </div>
            </div>

            {/* ------------------------- Center Section (Navigation Links) ------------------------- */}
            <nav className="hidden sm:flex flex-grow justify-center h-full max-w-4xl mx-auto">
                <NavigationIcon
                    icon={<Home className="w-6 h-6 lg:w-7 lg:h-7" />}
                    label="Home"
                    isActive={activeNav === 'Home'}
                    onClick={() => setActiveNav('Home')}
                />
                <NavigationIcon
                    icon={<MonitorPlay className="w-6 h-6 lg:w-7 lg:h-7" />}
                    label="Watch"
                    isActive={activeNav === 'Watch'}
                    onClick={() => setActiveNav('Watch')}
                />
                <NavigationIcon
                    icon={<Users className="w-6 h-6 lg:w-7 lg:h-7" />}
                    label="Friends"
                    isActive={activeNav === 'Friends'}
                    onClick={() => setActiveNav('Friends')}
                />
                {/* Placeholder for Marketplace/Profile */}
                <NavigationIcon
                    icon={<UserRound className="w-6 h-6 lg:w-7 lg:h-7" />}
                    label="Profile"
                    isActive={activeNav === 'Profile'}
                    onClick={() => setActiveNav('Profile')}
                />
            </nav>

            {/* ------------------------- Right Section (User Actions) ------------------------- */}
            <div className="flex items-center justify-end space-x-1 lg:space-x-2 shrink-0">
                
                {/* Mobile Search Icon (visible when the persistent search bar is hidden) */}
                <div className="sm:hidden">
                    <ActionButton icon={<Search className="w-5 h-5" />} label="Search" onClick={() => console.log('Open Search Modal')} />
                </div>

                {/* Main Action Icons (Hidden on extra small screens) */}
                <div className="hidden sm:flex items-center space-x-1 lg:space-x-2">
                    <ActionButton icon={<LayoutGrid className="w-5 h-5" />} label="Menu" onClick={() => console.log('Open Menu')} />
                    <ActionButton icon={<MessageCircle className="w-5 h-5" />} label="Messenger" onClick={() => console.log('Open Messenger')} hasNotification={true} />
                    <ActionButton icon={<Bell className="w-5 h-5" />} label="Notifications" onClick={() => console.log('Open Notifications')} hasNotification={currentUser.hasNotifications} />
                </div>
                
                {/* Profile Avatar and Dropdown */}
                <button 
                    className="flex items-center p-0.5 ml-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => console.log('Toggle User Menu')}
                    aria-label="Account Settings"
                >
                    <Avatar 
                        src={currentUser.avatarUrl} 
                        alt={currentUser.name} 
                        size="md" 
                        // The Avatar component should handle the size appropriately (e.g., 40px)
                    />
                    <ChevronDown className="w-4 h-4 text-gray-500 ml-1 hidden md:block" />
                </button>
            </div>
        </header>
    );
};

export default Header;