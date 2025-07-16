import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://restapi-s6gb.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setBasicAuth(username, password) {
  const token = btoa(`${username}:${password}`);
  instance.defaults.headers.common['Authorization'] = `Basic ${token}`;
}

export const healthCheck = () => instance.get('/health-check');
export const getJournals = () => instance.get('/journal');
export const addJournal = (journalData) => instance.post('/journal', journalData);
export const updateJournal = (journalData) => instance.put(`/journal/id/${journalData.id}`, journalData);
export const deleteJournal = (id) => instance.delete(`/journal/id/${id}`);
export const createUser = (userData) => instance.post('/public/create-user', userData);

// Remove or update auth endpoints if not used by backend