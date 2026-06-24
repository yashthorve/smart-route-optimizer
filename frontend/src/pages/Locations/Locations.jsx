import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Card, CardBody } from '../../components/ui/Card/Card';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/ui/Table/Table';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import Modal from '../../components/ui/Modal/Modal';
import Loader from '../../components/ui/Loader/Loader';
import { Plus, Edit2, Trash2, Search, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './Locations.module.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [isFetchingCoords, setIsFetchingCoords] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', latitude: '', longitude: '' });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await api.get('/locations');
      setLocations(res.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch locations');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (loc = null) => {
    if (loc) {
      setEditingLocation(loc);
      setFormData({ name: loc.name, latitude: loc.latitude, longitude: loc.longitude });
    } else {
      setEditingLocation(null);
      setFormData({ name: '', latitude: '', longitude: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLocation(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLocation) {
        await api.put(`/locations/${editingLocation.id}`, formData);
        toast.success('Location updated successfully');
      } else {
        await api.post('/locations', formData);
        toast.success('Location added successfully');
      }
      handleCloseModal();
      fetchLocations();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleFetchCoordinates = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a location name first');
      return;
    }
    
    setIsFetchingCoords(true);
    try {
      // Nominatim requires a user-agent, but fetch in browser sends it automatically.
      // We append format=json and limit=1 to get the top result
      const query = encodeURIComponent(formData.name);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
      
      if (!res.ok) throw new Error('Geocoding service unavailable');
      
      const data = await res.json();
      if (data && data.length > 0) {
        setFormData({
          ...formData,
          latitude: parseFloat(data[0].lat).toFixed(6),
          longitude: parseFloat(data[0].lon).toFixed(6)
        });
        toast.success('Coordinates found!');
      } else {
        toast.error('Could not find coordinates for this location');
      }
    } catch (error) {
      toast.error('Error fetching coordinates');
    } finally {
      setIsFetchingCoords(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        await api.delete(`/locations/${id}`);
        toast.success('Location deleted successfully');
        fetchLocations();
      } catch (error) {
        toast.error('Failed to delete location');
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Locations Management</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={16} /> Add Location
        </Button>
      </div>

      <Card>
        <CardBody>
          <div className={styles.toolbar}>
            <div className={styles.search} style={{ position: 'relative', width: '100%' }}>
              <Input
                placeholder="Search locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            </div>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Coordinates</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc) => (
                  <TableRow key={loc.id}>
                    <TableCell>{loc.name}</TableCell>
                    <TableCell>{loc.latitude}, {loc.longitude}</TableCell>
                    <TableCell>
                      <div className={styles.actionButtons}>
                        <Button variant="secondary" onClick={() => handleOpenModal(loc)} style={{ padding: '0.25rem 0.5rem' }}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(loc.id)} style={{ padding: '0.25rem 0.5rem' }}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} style={{ textAlign: 'center', padding: '2rem' }}>No locations found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingLocation ? 'Edit Location' : 'Add Location'}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Name (Address or City)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <Button 
              type="button" 
              onClick={handleFetchCoordinates}
              disabled={isFetchingCoords || !formData.name}
              style={{ marginBottom: '1rem' }}
            >
              <MapPin size={16} style={{ marginRight: '4px' }}/>
              {isFetchingCoords ? 'Searching...' : 'Autofill Coords'}
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Input
              label="Latitude"
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              required
            />
            <Input
              label="Longitude"
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              required
            />
          </div>
          <div className={styles.modalFooter}>
            <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit">{editingLocation ? 'Save Changes' : 'Add Location'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Locations;
