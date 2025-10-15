// import { useState, useEffect } from 'react';

// const API_BASE_URL = "https://elavon-api.onrender.com/api"


// export const useSettings = () => {
//   const [settings, setSettings] = useState({
//     account_balance: 0,
//     profile_name: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`https://elavon-api.onrender.com/api/settings`);
//         const data = await response.json();

//         if (data.success) {
//           setSettings(data.data);
//         } else {
//           setError(data.message || 'Failed to fetch settings');
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching settings:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSettings();
//   }, []);

//   return { settings, loading, error };
// };


// export const useTransaction = (limit = 10) => {
//   const [transaction, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `https://elavon-api.onrender.com/api/elavon/transactions?limit=${limit}&offset=0`
//         );
//         const data = await response.json();

//         setTransactions(data.data || []);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching transactions:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [limit]);

//   return { transaction, loading, error };
// };

// hooks/useElavon.js
// import { useState, useEffect } from 'react';

// const API_BASE_URL = "https://elavon-api.onrender.com/api";


// export const useSettings = () => {
//   const [settings, setSettings] = useState({
//     account_balance: 0,
//     profile_name: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${API_BASE_URL}/settings`);
//         const data = await response.json();

//         console.log('API Response:', data); 

//         if (data.success) {
//           console.log('Settings data:', data.data); 
//           setSettings({
//             account_balance: Number(data.data.account_balance) || 0,
//             profile_name: data.data.profile_name || '',
//           });
//         } else {
//           setError(data.message || 'Failed to fetch settings');
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching settings:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSettings();
//   }, []);

//   return { settings, loading, error };
// };


// export const useTransaction = (limit = 10) => {
//   const [transaction, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `${API_BASE_URL}/elavon/transactions?limit=${limit}&offset=0`
//         );
//         const data = await response.json();

//         console.log('Transactions:', data); // Debug log
//         setTransactions(data.data || []);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching transactions:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, [limit]);

//   return { transaction, loading, error };
// };

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = "https://elavon-api.onrender.com/api";

// Hook to fetch settings (profile name and balance)
export const useSettings = () => {
  const [settings, setSettings] = useState({
    account_balance: 0,
    profile_name: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/settings`);
      const data = await response.json();

      if (data.success) {
        setSettings({
          account_balance: Number(data.data.account_balance) || 0,
          profile_name: data.data.profile_name || '',
        });
      } else {
        setError(data.message || 'Failed to fetch settings');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, loading, error, refetchSettings: fetchSettings };
};

// Hook to fetch transaction histories
export const useTransaction = (limit = 10) => {
  const [transaction, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/elavon/transactions?limit=${limit}&offset=0`
      );
      const data = await response.json();
      setTransactions(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transaction, loading, error, refetchTransactions: fetchTransactions };
};
