import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, Package, Route, LogOut, Truck } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/locations', label: 'Locations', icon: <MapPin size={20} /> },
    { path: '/deliveries', label: 'Deliveries', icon: <Package size={20} /> },
    { path: '/optimize', label: 'Optimize Route', icon: <Route size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Truck size={28} />
        <span>SmartRoute</span>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className={styles.logout}>
        <button onClick={logout} className={`${styles.navItem} w-full text-left`} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, color: 'inherit' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
