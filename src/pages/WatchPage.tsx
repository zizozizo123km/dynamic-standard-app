import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { User, Video } from '../types/data'; // Assuming User and Video types exist in data.d.ts
import {
  Search,
  Settings,
  Tv,
  Users,
  Film,
  Bookmark,
  ChevronDown,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Play,
} from 'lucide-react';
import Avatar from '../components/ui/Avatar';

// --- Mock Data (Replace with API calls using useFeedData/apiClient) ---

const mockUser: User = {
    id: 'u1',
    name: 'Social Network Team',
    avatarUrl: 'https://via.placeholder.com/150/0078FF/FFFFFF?text=SN',
};

const mockVideos: Video[] = [
  {
    id: 'v1',
    title: 'The Future of Web Development in 2024: Next Generation Frameworks and Tools. #Code #React',
    source: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    thumbnail: 'https://picsum.photos/600/350?random=1',
    views: 12500,
    duration: '12:30',
    uploader: mockUser,
    timestamp: '2 hours ago',
  },
  {
    id: 'v2',
    title: 'React Hooks Deep Dive: Mastering useCallback and useMemo for performance optimization in large applications.',
    source: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/600/350?random=2',
    views: 5800,
    duration: '08:45',
    uploader: { id: 'u2', name: 'Tech Insights', avatarUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=TI' },
    timestamp: '1 day ago',
  },
  {
    id: 'v3',
    title: 'Travel Vlog: Exploring the Swiss Alps and Hidden Gems. A must-watch for nature lovers!',
    source: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://picsum.photos/600/350?random=3',
    views: 89000,
    duration: '21:15',
    uploader: { id: 'u3', name: 'Wanderlust Joe', avatarUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=WJ' },
    timestamp: '3 days ago',
  },
];

// --- Sub-Components ---

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    
    const formatViews = (views: number) => {
        if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
        if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
        return views.toLocaleString();
    };

    return (
        <div className="bg-white rounded-lg shadow-md mb-6 max-w-2xl mx-auto border border-gray-200">
            {/* Header */}
            <div className="flex items-start p-4">
                <Avatar src={video.uploader.avatarUrl} alt={video.uploader.name} size="md" />
                <div className="ml-3 flex-grow">
                    <p className="font-semibold text-sm hover:underline cursor-pointer">{video.uploader.name}</p>
                    <p className="text-xs text-gray-500">{video.timestamp} • {formatViews(video.views)} views</p>
                </div>
                <button className="text-blue-500 font-semibold text-sm px-3 py-1 rounded-full hover:bg-blue-50">
                    Follow
                </button>
                <MoreHorizontal className="w-5 h-5 text-gray-500 ml-2 cursor-pointer hover:text-gray-700" />
            </div>

            {/* Title/Description */}
            <p className="px-4 pb-2 text-gray-800 text-sm">{video.title}</p>

            {/* Video Placeholder */}
            <div className="relative bg-black w-full aspect-video cursor-pointer group">
                <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300">
                    <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition duration-300 fill-white" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}
                </span>
            </div>

            {/* Actions (Interaction Bar) */}
            <div className="p-4">
                {/* Stats row - usually likes/comments count */}
                <div className="flex justify-between items-center text-gray-500 border-b pb-2 mb-2 text-sm">
                    <span className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1 text-blue-500 fill-blue-500" />
                        {formatViews(video.views * 0.1)} Likes
                    </span>
                    <span>1.2K Comments • 50 Shares</span>
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-around text-gray-600">
                    <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 w-1/3 justify-center transition duration-150">
                        <ThumbsUp className="w-5 h-5 mr-1" />
                        <span className="hidden sm:inline">Like</span>
                    </button>
                    <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 w-1/3 justify-center transition duration-150">
                        <MessageCircle className="w-5 h-5 mr-1" />
                        <span className="hidden sm:inline">Comment</span>
                    </button>
                    <button className="flex items-center p-2 rounded-lg hover:bg-gray-100 w-1/3 justify-center transition duration-150">
                        <Share2 className="w-5 h-5 mr-1" />
                        <span className="hidden sm:inline">Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Sidebar Navigation ---

const WatchSidebar: React.FC = () => {
    const navItems = [
        { icon: Tv, label: "Home", active: true },
        { icon: Film, label: "Live" },
        { icon: Users, label: "Shows" },
        { icon: Bookmark, label: "Saved Videos" },
    ];

    return (
        <div className="p-3">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Watch</h1>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
                    <Settings className="w-5 h-5 text-black" />
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search videos"
                    className="w-full bg-gray-100 text-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <Search className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" />
            </div>

            {/* Navigation Links */}
            <nav className="border-b border-gray-200 pb-2">
                {navItems.map((item) => {
                    const activeClasses = item.active ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-200 text-gray-800";
                    return (
                        <a 
                            key={item.label} 
                            href="#" 
                            className={`flex items-center p-2 rounded-lg transition duration-150 ${activeClasses} mb-1`}
                        >
                            <item.icon className={`w-6 h-6 mr-3 ${item.active ? 'text-blue-600' : 'text-gray-600'}`} />
                            <span className="text-sm">{item.label}</span>
                        </a>
                    );
                })}
            </nav>

            {/* Suggested Categories (Simulated) */}
            <div className="mt-4">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-md font-semibold text-gray-600">Following</h2>
                    <button className="text-blue-500 text-sm hover:underline">Manage</button>
                </div>
                
                <div className="space-y-2">
                    {/* Mock followed pages/people */}
                    {[
                        { name: "Code Reviews Daily", avatar: "https://via.placeholder.com/150/FFC300?text=CRD" },
                        { name: "Frontend Masters", avatar: "https://via.placeholder.com/150/00FFFF?text=FM" },
                        { name: "Dev Ops Weekly", avatar: "https://via.placeholder.com/150/FF0000?text=DO" }
                    ].map((follower, i) => (
                        <div key={i} className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                            <Avatar src={follower.avatar} alt={follower.name} size="sm" />
                            <span className="ml-3 text-sm font-medium truncate">{follower.name}</span>
                        </div>
                    ))}
                </div>
                <button className="flex items-center text-blue-500 mt-2 p-2 hover:bg-gray-100 w-full rounded-lg justify-center">
                    <ChevronDown className="w-5 h-5 mr-2" />
                    <span className="text-sm">See more</span>
                </button>
            </div>
        </div>
    );
}

// --- Main Page Component ---

const WatchPage: React.FC = () => {
  return (
    <MainLayout>
      {/* 
        We use the MainLayout structure but define the internal layout 
        specifically for the Watch page: Fixed Left Sidebar and Scrolling Center Feed.
      */}
      
      <div className="flex w-full min-h-screen pt-4 bg-gray-100">
        
        {/* Customized Fixed Left Sidebar (Desktop Only) */}
        {/* Adjusted to be slightly wider than standard sidebar for watch navigation focus */}
        <div className="hidden lg:block lg:w-80 fixed h-[calc(100vh-60px)] top-[60px] overflow-y-auto border-r border-gray-200 bg-white z-20 shadow-sm">
            <WatchSidebar />
        </div>

        {/* Video Feed Content Area */}
        {/* Offset margin matches the fixed sidebar width (80) */}
        <div className="flex-1 lg:ml-80 flex justify-center py-6 px-4">
          <div className="w-full max-w-2xl">
            
            {/* Mobile/Tablet Title (Sidebar handles desktop title) */}
            <h2 className="text-xl font-bold text-gray-900 mb-6 lg:hidden border-b pb-2">Watch Videos</h2>
            
            {/* Video Feed */}
            {mockVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
            
            <div className="text-center text-gray-500 py-10">
                <p>Loading more videos...</p>
            </div>
          </div>
        </div>
        
        {/* No Right Sidebar needed for typical Facebook Watch UI */}

      </div>

    </MainLayout>
  );
};

export default WatchPage;