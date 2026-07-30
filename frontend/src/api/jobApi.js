import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllJobs = () => api.get('/jobPosts');
export const getJobById = (id) => api.get(`/jobPost/${id}`);
export const searchJobs = (keyword) => api.get(`/jobPosts/keyword/${keyword}`);
export const addJob = (jobPost) => api.post('/jobPost', jobPost);
export const updateJob = (jobPost) => api.put('/jobPost', jobPost);
export const deleteJob = (id) => api.delete(`/jobPost/${id}`);
export const loadSampleData = () => api.get('/load');

export default api;
