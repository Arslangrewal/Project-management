'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner";
import { logoutUser } from '@/redux/slices/authSlice';


export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const displayName = user?.name || 'User';
  const displayEmail = user?.email || 'Signed in';
  const initials = displayName
  
    .split(' ')
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
  const result = await dispatch(logoutUser());
  if (logoutUser.fulfilled.match(result)) {
  
              toast.success("Logged out successfully.");
  
              router.push("/login");
  
              return;
          }else{
            toast.error("Logout failed.");
          }
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        className='flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1.5 text-slate-700 transition hover:bg-slate-200 dark:bg-neutral-800 dark:text-slate-100 dark:hover:bg-neutral-700'
        aria-expanded={open}
        aria-haspopup='menu'
        aria-label='User profile menu'
        onClick={() => setOpen((current) => !current)}
      >
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white'>
          {initials || <User className='h-4 w-4' />}
        </span>
        <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role='menu'
          className='absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900'
        >
          <div className='border-b border-slate-100 px-4 py-3 dark:border-neutral-800'>
            <p className='truncate text-sm font-semibold text-slate-900 dark:text-slate-100'>
              {displayName}
            </p>
            <p className='truncate text-xs text-slate-500 dark:text-slate-400'>
              {displayEmail}
            </p>
            {user?.role && (
              <p className='mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium capitalize text-slate-600 dark:bg-neutral-800 dark:text-slate-300'>
                {user.role}
              </p>
            )}
          </div>

          <button
            type='button'
            role='menuitem'
            className='flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30'
            onClick={handleLogout}
          >
            <LogOut className='h-4 w-4' />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
