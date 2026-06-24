import { useState } from 'react';
import api from '../../api/axios';
import { Card, CardBody, CardHeader } from '../../components/ui/Card/Card';
import Button from '../../components/ui/Button/Button';
import Loader from '../../components/ui/Loader/Loader';
import RouteMap from '../../components/ui/Map/RouteMap';
import { Route, Map as MapIcon, Route as RouteIcon, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './Optimization.module.css';

const Optimization = () => {
  const [routeData, setRouteData] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const res = await api.get('/routes/optimize');
      setRouteData(res.data);
      toast.success('Route optimized successfully!');
    } catch (error) {
      toast.error('Failed to optimize route. Ensure OR-Tools backend is running.');
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Route Optimization</h1>
        <Button onClick={handleOptimize} disabled={isOptimizing}>
          {isOptimizing ? 'Generating Route...' : (
            <>
              <RouteIcon size={16} /> Generate Optimized Route
            </>
          )}
        </Button>
      </div>

      <div className={styles.content}>
        {/* Timeline Section */}
        <Card className={styles.timelineCard}>
          <CardHeader title="Optimized Sequence" />
          <CardBody>
            {!routeData && !isOptimizing && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                Click "Generate Optimized Route" to calculate the best sequence.
              </div>
            )}
            
            {isOptimizing && <Loader />}

            {routeData && !isOptimizing && (
              <>
                <div className={styles.summary}>
                  <div className={styles.summaryBadge}>
                    <Navigation size={16} /> Stops: {routeData.optimizedRoute?.length || 0}
                  </div>
                  {routeData.totalDistance !== undefined && (
                    <div className={styles.summaryBadge}>
                      <RouteIcon size={16} /> Distance: {routeData.totalDistance}
                    </div>
                  )}
                </div>

                <div className={styles.timeline}>
                  {routeData.optimizedRoute?.map((stop, index) => (
                    <div key={index} className={styles.timelineItem}>
                      <div className={styles.timelineMarker}>{index + 1}</div>
                      <div className={styles.timelineContent}>
                        <div className={styles.timelineTitle}>
                          {stop.name || `Location ${stop.id}`}
                        </div>
                        <div className={styles.timelineDesc}>
                          Lat: {stop.latitude}, Lng: {stop.longitude}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardBody>
        </Card>

        {/* Map Placeholder Section */}
        <Card>
          <CardHeader title="Route Map View" />
          <CardBody style={{ height: '100%', padding: 0 }}>
            <RouteMap routeData={routeData?.optimizedRoute} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Optimization;
