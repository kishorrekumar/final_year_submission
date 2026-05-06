const API_BASE_URL = import.meta.env.PROD 
  ? 'https://project.ramcoad.com/api' 
  : 'http://localhost:6002/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  SUBMISSIONS: `${API_BASE_URL}/submissions`,
  SUBMISSION_DETAILS: (id) => `${API_BASE_URL}/submissions/${id}`,
};

export default API_BASE_URL;
