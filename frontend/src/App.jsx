import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import JobForm from './pages/JobForm';

let toastId = 0;

export default function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home addToast={addToast} />} />
          <Route path="/job/:id" element={<JobDetail addToast={addToast} />} />
          <Route path="/add" element={<JobForm addToast={addToast} />} />
          <Route path="/edit/:id" element={<JobForm addToast={addToast} />} />
        </Routes>
      </main>
      <Toast toasts={toasts} removeToast={removeToast} />
    </BrowserRouter>
  );
}
