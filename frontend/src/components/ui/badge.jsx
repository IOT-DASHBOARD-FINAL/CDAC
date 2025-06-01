import React from 'react';
import { cn } from '@/lib/utils';

const Badge = ({ status }) => {
  const statusClasses = {
    Connected: 'bg-green-500 text-white',
    Disconnected: 'bg-red-500 text-white',
    Error: 'bg-red-500 text-white',
    Expired: 'bg-yellow-500 text-white',
  };

  return (
    <span className={cn('px-2 py-1 rounded-2xl text-sm', statusClasses[status])}>
      {status}
    </span>
  );
};

export default Badge;