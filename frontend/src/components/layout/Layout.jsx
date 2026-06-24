import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

export const Layout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              {(user.username || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <span>{user.username || user.email}</span>
          </div>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
