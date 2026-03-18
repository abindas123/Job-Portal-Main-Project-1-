import api from "./Axios";

// Candidate: apply to a job
// export const applyToJob = (jobId, payload) =>
//   api.post(`/applications/${jobId}`, payload);
export const applyToJob = (jobId, payload) => {
  console.log("API applyToJob called with jobId:", jobId);
  return api.post(`/applications/${jobId}`, payload);
};

// Candidate: view my applications
export const getMyApplications = () => api.get("/applications/my");

// Employer: view applicants for a job
export const getApplicantsForJob = (jobId) =>
  api.get(`/applications/job/${jobId}`);

// Employer: update application status
export const updateApplicationStatus = (applicationId, payload) =>
  api.put(`/applications/${applicationId}/status`, payload);
