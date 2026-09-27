'use client';

import { Bell } from 'lucide-react';

export function NotificationDropdown() {
  return (
    <button
      type='button'
      className='rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200'
      aria-label='Notifications'
    >
      <Bell className='h-5 w-5' />
    </button>
  );
}
