import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import PostCreator from '../components/feed/PostCreator';
import Post from '../components/feed/Post';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import {
  Camera,
  Edit,
  Plus,
  Briefcase,
  GraduationCap,
  MapPin,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react';

// Assuming types are defined in src/types/data.d.ts
import { User, PostType } from '../types/data';
import { useAuth } from '../hooks/useAuth';

// --- Mock Data ---
// Mock User structure (simplified)
const mockUserProfile: User = {
  id: 'u-100',
  name: 'Ahmed Hassan',
  username: 'ahmed.hassan',
  avatarUrl: 'https://i.pravatar.cc/150?img=68',
  coverUrl: 'https://images.unsplash.com/photo-1549490218-500e572887a2?fit=crop&w=1200&h=400&q=80',
  bio: 'Software Architect | Building modern web solutions. Love coffee and open source.',
  friendsCount: 1245,
  city: 'Cairo, Egypt',
  work: 'Senior React Architect at TechCorp',
  education: 'Cairo University',
};

// Mock Post structure (must align with Post component props)
const mockPosts: PostType[] = [
  {
    id: 'p-1',
    user: mockUserProfile,
    content: 'Just finished deploying the new authentication service! Feeling productive. 🎉',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likesCount: 52,
    commentsCount: 12,
    mediaUrl: null,
  },
  {
    id: 'p-2',
    user: mockUserProfile,
    content: 'A beautiful sunset view from my balcony today. Sometimes you just need to stop and appreciate the simple things.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    likesCount: 180,
    commentsCount: 35,
    mediaUrl: 'https://images.unsplash.com/photo-1517400508092-be2a9b3d0c26?fit=crop&w=600&q=80',
  },
];
// -----------------

const ProfilePage: React.FC = () => {
  // Use userId from URL parameters if available, otherwise assume current user
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  
  // Mock data fetching based on the URL or current user
  const profile = mockUserProfile; // Replace with actual fetch logic
  const posts = mockPosts; // Replace with actual fetch logic

  const [activeTab, setActiveTab] = useState('Posts');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine if the profile being viewed belongs to the current authenticated user
  const isOwnProfile = currentUser?.id === profile.id || !userId; 

  const handleEditProfile = () => {
    if (isOwnProfile) {
      setIsModalOpen(true);
    }
  };

  // --- Sub-Components ---

  const ProfileHeader = () => (
    <div className="bg-white shadow-md rounded-lg mb-6">
      {/* Cover Photo */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <img
          src={profile.coverUrl}
          alt="Cover Photo"
          className="w-full h-full object-cover rounded-t-lg"
        />
        {isOwnProfile && (
          <Button
            variant="secondary"
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800"
            size="sm"
          >
            <Camera className="w-4 h-4 mr-2" />
            Edit Cover Photo
          </Button>
        )}
      </div>

      <div className="p-4 md:px-8 -mt-20 md:-mt-24 flex flex-col md:flex-row items-center md:items-end">
        {/* Avatar Section */}
        <div className="relative mb-4 md:mb-0">
          <Avatar 
            src={profile.avatarUrl} 
            alt={profile.name} 
            size="xl" 
            className="border-4 border-white shadow-lg"
          />
          {isOwnProfile && (
            <button className="absolute bottom-2 right-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-full border border-white">
              <Camera className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Info & Actions */}
        <div className="md:ml-6 flex-grow text-center md:text-left pt-2 border-b md:border-none w-full md:w-auto">
          <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-600 mb-4">{profile.friendsCount.toLocaleString()} Friends</p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-2">
          {isOwnProfile ? (
            <>
              <Button onClick={handleEditProfile} variant="secondary">
                <Edit className="w-5 h-5 mr-2" />
                Edit Profile
              </Button>
              <Button variant="primary">
                <Plus className="w-5 h-5 mr-2" />
                Add Story
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary">
                <ThumbsUp className="w-5 h-5 mr-2" />
                Friend
              </Button>
              <Button variant="secondary">
                <MessageCircle className="w-5 h-5 mr-2" />
                Message
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="border-t mt-4 px-8 flex justify-between items-center overflow-x-auto">
        <div className="flex space-x-6 sm:space-x-8">
          {['Posts', 'About', 'Friends', 'Photos', 'Videos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 whitespace-nowrap transition duration-150 ease-in-out ${
                activeTab === tab
                  ? 'text-blue-600 border-b-4 border-blue-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <Button variant="secondary" size="sm" className="hidden sm:flex ml-4">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </nav>
    </div>
  );

  const ProfileIntroCard: React.FC = () => (
    <div className="bg-white shadow rounded-lg p-4 sticky top-24">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Intro</h3>
      <p className="text-gray-700 mb-4">{profile.bio}</p>
      
      <ul className="space-y-3 text-gray-600">
        <li className="flex items-center">
          <Briefcase className="w-5 h-5 mr-3 text-gray-500" />
          Works as <span className="font-semibold ml-1 text-gray-800">{profile.work}</span>
        </li>
        <li className="flex items-center">
          <GraduationCap className="w-5 h-5 mr-3 text-gray-500" />
          Studied at <span className="font-semibold ml-1 text-gray-800">{profile.education}</span>
        </li>
        <li className="flex items-center">
          <MapPin className="w-5 h-5 mr-3 text-gray-500" />
          Lives in <span className="font-semibold ml-1 text-gray-800">{profile.city}</span>
        </li>
      </ul>
      
      {isOwnProfile && (
        <Button variant="secondary" className="w-full mt-4">
          Edit Details
        </Button>
      )}
    </div>
  );

  const ProfileContent = () => {
    if (activeTab !== 'Posts') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md min-h-[50vh] flex items-center justify-center">
          <p className="text-gray-500">Content for the '{activeTab}' tab is under development.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-6">
        {/* Left Column (Intro/Photos) */}
        <div className="lg:col-span-1 space-y-4 hidden lg:block">
          <ProfileIntroCard />
          {/* Mock Photos Card */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Photos</h3>
            <div className="grid grid-cols-3 gap-1">
              {Array(9).fill(0).map((_, i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/100/100?random=${i + 10}`}
                  alt={`Gallery item ${i}`}
                  className="w-full h-auto object-cover rounded-md aspect-square hover:opacity-90 transition cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Posts Feed) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Post Creator (Only visible if viewing own profile) */}
          {isOwnProfile && <PostCreator />}
          
          {/* User Posts */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post key={post.id} post={post} />
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
              No posts found for this user yet.
            </div>
          )}
        </div>
      </div>
    );
  };

  const EditProfileModal: React.FC = () => {
    // Mock state for form data
    const [name, setName] = useState(profile.name);
    const [bio, setBio] = useState(profile.bio);

    const handleSubmit = () => {
      console.log('Saving profile:', { name, bio });
      // In a real app: Call API to update profile
      setIsModalOpen(false);
    };

    return (
      <Modal 
        title="Edit Profile" 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        footer={
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        }
      >
        <div className="space-y-4 p-4">
          <h4 className="text-lg font-semibold border-b pb-2">Basic Info</h4>
          <Input 
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input 
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            as="textarea"
            rows={3}
          />
        </div>
      </Modal>
    );
  };


  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-0 lg:px-4 pt-4">
        
        {/* 1. Profile Header (Cover, Avatar, Info, Nav) */}
        <ProfileHeader />

        {/* 2. Main Content Area (Intro/Feed) */}
        <div className="px-4 lg:px-0 py-4">
          <ProfileContent />
        </div>
        
      </div>
      
      {isModalOpen && <EditProfileModal />}
    </MainLayout>
  );
};

export default ProfilePage;