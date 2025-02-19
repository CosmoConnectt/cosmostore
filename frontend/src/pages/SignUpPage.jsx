import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    }
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          [field]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <motion.div
        className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-indigo-400'>
          Create your account
        </h2>
      </motion.div>
      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-gradient-to-r from-gray-900 via-indigo-950 to-black py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                Full name
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='name'
                  type='text'
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  name='name'
                  className='block w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='John Doe'
                />
              </div>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                Email address
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='email'
                  type='email'
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  name='email'
                  className='block w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
                Password
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='password'
                  type='password'
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  name='password'
                  className='block w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
                Confirm Password
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input
                  id='confirmPassword'
                  type='password'
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  name='confirmPassword'
                  className='block w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='••••••••'
                />
              </div>
            </div>

            {/* Address Fields */}
            <div>
              <label htmlFor='address.street' className='block text-sm font-medium text-gray-300'>
                Street
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  id='address.street'
                  type='text'
                  required
                  value={formData.address.street}
                  onChange={handleInputChange}
                  name='address.street'
                  className='block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='Street'
                />
              </div>
            </div>

            <div>
              <label htmlFor='address.city' className='block text-sm font-medium text-gray-300'>
                City
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  id='address.city'
                  type='text'
                  required
                  value={formData.address.city}
                  onChange={handleInputChange}
                  name='address.city'
                  className='block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='City'
                />
              </div>
            </div>

            <div>
              <label htmlFor='address.state' className='block text-sm font-medium text-gray-300'>
                State
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  id='address.state'
                  type='text'
                  required
                  value={formData.address.state}
                  onChange={handleInputChange}
                  name='address.state'
                  className='block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='State'
                />
              </div>
            </div>

            <div>
              <label htmlFor='address.postalCode' className='block text-sm font-medium text-gray-300'>
                Postal Code
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  id='address.postalCode'
                  type='text'
                  required
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                  name='address.postalCode'
                  className='block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='Postal Code'
                />
              </div>
            </div>

            <div>
              <label htmlFor='address.country' className='block text-sm font-medium text-gray-300'>
                Country
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  id='address.country'
                  type='text'
                  required
                  value={formData.address.country}
                  onChange={handleInputChange}
                  name='address.country'
                  className='block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  placeholder='Country'
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
                  Sign up
                </>
              )}
            </button>
          </form>
          <p className='mt-8 text-center text-sm text-gray-400'>
            Already have an account?{" "}
            <Link to='/login' className='font-medium text-indigo-400 hover:text-indigo-300'>
              Login here <ArrowRight className='inline h-4 w-4' />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
