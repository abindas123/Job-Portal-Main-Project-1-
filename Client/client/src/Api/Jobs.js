import api from "./Axios";

// Public
export const getJobs = (params) => api.get("/jobs", { params });
export const getJobById = (id) => api.get(`/jobs/${id}`);

// Employer
export const getMyJobs = () => api.get("/jobs/my-jobs");
export const createJob = (payload) => api.post("/jobs", payload);
export const updateMyJob = (id, payload) => api.put(`/jobs/${id}`, payload);
export const deleteMyJob = (id) => api.delete(`/jobs/${id}`);
