import React from 'react';
import RegisterForm from './RegisterForm';
import SocialLogin from './SocialLogin';
import { Pen } from 'lucide-react';
// import { Link } from 'react-router-dom';

const RegisterCard = () => {
  return (
    <div className="flex w-full h-full">
      {/* Left side - Image */}
      <div className="hidden md:block w-1/2 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1582727657635-c771002bdada?q=80&w=2070&auto=format&fit=crop')`
        }}
      />
      
      {/* Right side - Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Pen className="w-5 h-5" />
              <span className="text-xl font-semibold">WriteWhisper</span>
            </div>
            <h2 className="text-2xl font-bold">Hello!</h2>
            <p className="text-gray-600 mt-2">Register to get started</p>
          </div>

          <RegisterForm />
          <SocialLogin />

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            {/* <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
              Login now
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;