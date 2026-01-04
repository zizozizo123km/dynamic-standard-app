import React from 'react';
import { Frown } from 'lucide-react';

/**
 * NotFoundPage component displays a standard 404 error page.
 * It provides a clear message and a link back to the homepage.
 */
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 text-center">
      
      {/* Icon representing the error */}
      <Frown className="w-24 h-24 text-blue-600 mb-6 animate-pulse" />

      <h1 className="text-7xl md:text-8xl font-black text-gray-900 mb-4 select-none">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
        This Page Isn't Available
      </h2>

      <p className="text-lg text-gray-500 mb-8 max-w-md">
        The link you followed may be broken, or the page may have been removed.
      </p>

      {/* Navigation button */}
      <a
        href="/"
        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        title="Return to News Feed"
      >
        Go to News Feed
      </a>
    </div>
  );
};

export default NotFoundPage;