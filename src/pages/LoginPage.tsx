import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Facebook } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

const LoginPage: React.FC = () => {
  // Renders a layout similar to the traditional Facebook login page, 
  // featuring branding on the left and the login form container on the right.
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-10 pb-20 sm:pt-40 sm:pb-40 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl">
        
        {/* Left Section: Branding and Marketing Message */}
        <div className="lg:w-[580px] flex flex-col justify-center items-center lg:items-start p-4 lg:p-10 mb-8 lg:mb-0">
          <div className="flex items-center text-blue-600 mb-4">
            {/* Mimics a large Facebook logo/name */}
            <Facebook className="w-16 h-16 sm:w-20 sm:h-20 mr-2" />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-blue-600">
              fakebook
            </h1>
          </div>
          <p className="text-xl sm:text-2xl text-gray-800 max-w-md mt-4">
            Fakebook helps you connect and share with the people in your life.
          </p>
        </div>

        {/* Right Section: Login Form Container */}
        <div className="w-full lg:w-[450px] flex justify-center">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
            <LoginForm />
            
            {/* Separator */}
            <hr className="my-6 border-gray-300" />
            
            <div className="text-center">
              {/* Link to Register Page */}
              <Link to="/register" className="inline-block w-3/4 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-200 text-lg">
                Create New Account
              </Link>
            </div>
          </div>
          
          <p className="absolute bottom-20 text-sm text-center mt-6 text-gray-700">
                <a href="#" className="font-bold hover:underline">Create a Page</a> for a celebrity, band or business.
            </p>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;