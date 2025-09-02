import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Page title area - can be customized per page */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 ml-12 lg:ml-0">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h2>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-2">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.initials || 'U'}
                  </span>
                </div>
                <span className="hidden sm:block">{user?.name}</span>
                <ChevronDownIcon className="w-4 h-4" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-gray-500 truncate">{user?.email}</p>
                      </div>
                    )}
                  </Menu.Item>
                  
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-gray-50' : ''
                        } group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-red-600`}
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;