import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Card, CardBody } from '../../components/ui/Card/Card';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/ui/Table/Table';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import Modal from '../../components/ui/Modal/Modal';
import Loader from '../../components/ui/Loader/Loader';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './Deliveries.module.css';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState(null);
  
  const [formData, setFormData] = useState({ 
    customerName: '', 
    locationId: '', 
    status: 'pending' 
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [delRes, locRes] = await Promise.all([
        api.get('/deliveries'),
        api.get('/locations')
      ]);
      setDeliveries(delRes.data.data || []);
      setLocations(locRes.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDeliveries = deliveries.filter(del => 
    (del.customer_name || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (del = null) => {
    if (del) {
      setEditingDelivery(del);
      setFormData({ 
        customerName: del.customer_name, 
        locationId: locations.find(l => l.name === del.location_name)?.id || '', 
        status: del.status 
      });
    } else {
      setEditingDelivery(null);
      setFormData({ customerName: '', locationId: '', status: 'pending' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDelivery(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDelivery) {
        await api.put(`/deliveries/${editingDelivery.id}`, {
          customer_name: formData.customerName,
          location_id: formData.locationId,
          status: formData.status
        });
        toast.success('Delivery updated successfully');
      } else {
        await api.post('/deliveries', {
          customer_name: formData.customerName,
          location_id: formData.locationId
        });
        toast.success('Delivery added successfully');
      }
      handleCloseModal();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      try {
        await api.delete(`/deliveries/${id}`);
        toast.success('Delivery deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete delivery');
      }
    }
  };


  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Deliveries Management</h1>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={16} /> Add Delivery
        </Button>
      </div>

      <Card>
        <CardBody>
          <div className={styles.toolbar}>
            <div className={styles.search} style={{ position: 'relative', width: '100%' }}>
              <Input
                placeholder="Search customer name..."
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
                <TableHeader>Customer Name</TableHeader>
                <TableHeader>Destination</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((del) => (
                  <TableRow key={del.id}>
                    <TableCell>{del.customer_name}</TableCell>
                    <TableCell>{del.location_name}</TableCell>
                    <TableCell>
                      <span className={`${styles.badge} ${styles[del.status.toLowerCase()] || ''}`}>
                        {del.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className={styles.actionButtons}>
                        <Button variant="secondary" onClick={() => handleOpenModal(del)} style={{ padding: '0.25rem 0.5rem' }}>
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(del.id)} style={{ padding: '0.25rem 0.5rem' }}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No deliveries found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingDelivery ? 'Edit Delivery' : 'Add Delivery'}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Customer Name"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            required
          />
          <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Destination</label>
            <select 
              value={formData.locationId}
              onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
              required
              style={{ padding: '0.625rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', outline: 'none' }}
            >
              <option value="">Select Destination</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>
          {editingDelivery && (
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
                style={{ padding: '0.625rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', outline: 'none' }}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
          <div className={styles.modalFooter}>
            <Button type="button" variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit">{editingDelivery ? 'Save Changes' : 'Add Delivery'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Deliveries;
