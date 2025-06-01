import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Badge from './ui/badge';
import { Button } from './ui/button1';
import { getStatus } from '@/utils/status';

import { FaRegBell, FaRegUser } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";

const Header = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState('Disconnected');
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
        if (user && user.id) {
            const currentStatus = await getStatus(user.id);
            setStatus(currentStatus);
        }
    };

    fetchStatus();
  }, []);

  return (
    <motion.header layout
      className="fixed top-0 left-0 sm:left-36 lg:left-64 md:left-48 right-0 z-[40] bg-foreground text-secondary flex justify-between items-center py-4 px-6 shadow-lg border-secondary/30"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        {user?.role === 'ADMIN' ? (
          <motion.div
            className="hidden md:block text-3xl cursor-pointer transition-transform"
            whileHover={{ scale: 1.1 }}
          >
            <RiAdminFill />
          </motion.div>
        ) : (
          <motion.div
            className="hidden md:block text-3xl cursor-pointer transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
          >
            <FaRegUser />
          </motion.div>
        )}
        <p className="pl-2 sm:pl-0 text-base sm:text-lg font-medium">{user?.username || "Guest"}</p>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
        >
          <Button 
            variant="secondary" className="rounded-lg px-1 sm:px-4 shadow-md transition-all hover:shadow-lg text-bold text-foreground hover:bg-tertiary hover:text-secondary"
            onClick={() => user.role === 'ADMIN' ? Navigate('/manageProject') : Navigate('/projects')}
          >
          {user?.role === 'ADMIN' ? 'Manage Projects' : 'Quick Start'}
          </Button>
        </motion.div>
        <Badge status={status} className="text-sm font-semibold" />
        <motion.div
          className="text-xl sm:text-3xl cursor-pointer transition-transform hover:scale-110"
          whileHover={{ scale: 1.1 }}
        >
          <FaRegBell />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;