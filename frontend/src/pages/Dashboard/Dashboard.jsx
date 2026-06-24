import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Card, CardBody } from '../../components/ui/Card/Card';
import Loader from '../../components/ui/Loader/Loader';
import { MapPin, Package, CheckCircle } from 'lucide-react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ locations: 0, deliveries: 0, pending: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [locRes, delRes] = await Promise.all([
          api.get('/locations'),
          api.get('/deliveries')
        ]);
        
        const locations = locRes.data.count || 0;
        const deliveriesData = delRes.data.data || [];
        const deliveries = delRes.data.count || 0;
        const pending = deliveriesData.filter(d => d.status === 'pending').length || 0;

        setStats({ locations, deliveries, pending });
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
      </div>

      <div className={styles.statsGrid}>
        <Card>
          <CardBody className={styles.statCard}>
            <div className={styles.iconWrapper}>
              <MapPin size={28} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Locations</span>
              <span className={styles.statValue}>{stats.locations}</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className={styles.statCard}>
            <div className={styles.iconWrapper}>
              <Package size={28} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Deliveries</span>
              <span className={styles.statValue}>{stats.deliveries}</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className={styles.statCard}>
            <div className={styles.iconWrapper} style={{ backgroundColor: '#d4edda', color: '#28a745' }}>
              <CheckCircle size={28} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Pending Deliveries</span>
              <span className={styles.statValue}>{stats.pending}</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
