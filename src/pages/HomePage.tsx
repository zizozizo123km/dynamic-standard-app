import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import SidebarLeft from '../components/layout/SidebarLeft';
import SidebarRight from '../components/layout/SidebarRight';
import PostCreator from '../components/feed/PostCreator';
import StorySection from '../components/feed/StorySection';
import Post from '../components/feed/Post';
import { useFeedData } from '../hooks/useFeedData';
import { Loader2, Users, Group, ShoppingBag } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import { Post as PostType } from '../types/data'; // Assuming PostType is defined

const HomePage: React.FC = () => {
  // Fetch feed data using the custom hook
  const { posts, isLoading, error } = useFeedData();

  // --- Sidebar Content Definitions ---

  // Left Sidebar: Navigation/Shortcuts
  const renderSidebarLeftContent = () => {
    // Placeholder links for a typical social media platform
    const links = [
      { icon: Users, label: 'Friends', color: 'text-blue-600' },
      { icon: Group, label: 'Groups', color: 'text-green-600' },
      { icon: ShoppingBag, label: 'Marketplace', color: 'text-purple-600' },
      { icon: Loader2, label: 'Watch', color: 'text-red-600' },
    ];

    return (
      <nav className="p-4 space-y-1">
        {links.map((link) => (
          <a
            key={link.label}
            href={`#${link.label.toLowerCase()}`}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <link.icon className={`w-6 h-6 ${link.color}`} />
            <span className="font-medium">{link.label}</span>
          </a>
        ))}
      </nav>
    );
  };

  // Right Sidebar: Contacts/Ads/Suggestions
  const renderSidebarRightContent = () => {
    // Dummy Contacts
    const contacts = [
      { name: 'Alice Johnson', status: 'online', avatarUrl: '/path/to/avatar1.jpg' },
      { name: 'Bob Smith', status: 'online', avatarUrl: '/path/to/avatar2.jpg' },
      { name: 'Charlie Brown', status: 'away', avatarUrl: '/path/to/avatar3.jpg' },
      { name: 'Diana Prince', status: 'online', avatarUrl: '/path/to/avatar4.jpg' },
    ];

    return (
      <div className="p-4 space-y-6">
        <h3 className="text-lg font-semibold text-gray-600 border-b pb-2">Contacts (4)</h3>
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li key={contact.name} className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
              <Avatar src={contact.avatarUrl} alt={contact.name} size="md" status={contact.status === 'online' ? 'online' : 'none'} />
              <span className="text-sm font-medium">{contact.name}</span>
            </li>
          ))}
        </ul>
        
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold text-gray-600 mb-3">Sponsored</h3>
          <div className="p-3 bg-white border rounded-lg shadow-sm">
            <p className="text-sm font-medium">New React Course 🚀</p>
            <p className="text-xs text-blue-500 cursor-pointer hover:underline">www.architechdev.com</p>
          </div>
        </div>
      </div>
    );
  };

  // --- Main Feed Renderer ---
  const renderFeed = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center h-60 bg-white rounded-xl shadow-md p-6">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600">Loading your feed...</p>
        </div>
      );
    }

    if (error) {
        return <div className="p-6 text-center text-red-600 bg-red-100 border border-red-300 rounded-xl">Error loading feed data. Please try again later.</div>;
    }

    if (!posts || posts.length === 0) {
      return (
        <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-xl border">
          <p>It seems quiet here. Start a new post!</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {posts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  };

  // --- Component Structure ---
  return (
    <MainLayout
      sidebarLeft={<SidebarLeft>{renderSidebarLeftContent()}</SidebarLeft>}
      sidebarRight={<SidebarRight>{renderSidebarRightContent()}</SidebarRight>}
    >
      <div className="flex flex-col items-center py-4 px-2 md:px-0">

        {/* 1. Stories */}
        <div className="w-full max-w-3xl mb-6">
          <StorySection />
        </div>

        {/* 2. Post Creator Input */}
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl mb-6">
          <PostCreator />
        </div>

        {/* 3. Feed Display */}
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
          {renderFeed()}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;