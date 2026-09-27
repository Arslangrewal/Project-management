import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreSession } from '@/redux/slices/authSlice';
import { getFromStorage } from '../services/storageService';

export default function useSessionRestore() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getFromStorage('auth');

    if (auth?.isAuthenticated) {
      dispatch(restoreSession(auth));
    }
  }, [dispatch]);
}
