import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCustomers, getHealth, seedDatabase } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [activeCustomer, setActiveCustomer] = useState(null);
  const [dbStatus, setDbStatus] = useState({ isConnected: false, loading: true });
  const [isSeeding, setIsSeeding] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const loadInitialData = async () => {
    try {
      const health = await getHealth();
      setDbStatus(health.database || { isConnected: false });

      const customerList = await getCustomers();
      setCustomers(customerList);

      if (customerList.length > 0) {
        // Keep current customer or default to the first
        setActiveCustomer(prev => {
          if (prev) {
            const found = customerList.find(c => c._id === prev._id);
            return found || customerList[0];
          }
          return customerList[0];
        });
      }
    } catch (err) {
      console.warn('Could not connect to backend:', err.message);
      setDbStatus({
        isConnected: false,
        error: err.message,
        setupInstructions: 'Backend or MongoDB is unreachable. Check if the server is running on port 5000 and MongoDB on port 27017.'
      });
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const res = await seedDatabase();
      showNotification('Knowledge Graph database seeded successfully!', 'success');
      await loadInitialData();
    } catch (err) {
      showNotification(`Seeding failed: ${err.message}`, 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  const switchCustomer = (customer) => {
    setActiveCustomer(customer);
    showNotification(`Active customer switched to ${customer.name}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        customers,
        activeCustomer,
        setActiveCustomer,
        switchCustomer,
        dbStatus,
        isSeeding,
        handleSeed,
        refreshAppState: loadInitialData,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
