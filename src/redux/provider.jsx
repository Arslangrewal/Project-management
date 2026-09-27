'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { finishAuthHydration, restoreSession } from './slices/authSlice';
import store from './store';

function SessionRestore({ children }) {
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');

    if (storedAuth) {
      try {
        store.dispatch(restoreSession(JSON.parse(storedAuth)));
      } catch {
        localStorage.removeItem('auth');
        store.dispatch(finishAuthHydration());
      }

      return;
    }

    store.dispatch(finishAuthHydration());
  }, []);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <SessionRestore>{children}</SessionRestore>
    </Provider>
  );
}
