// API configuration utility for handling different deployment environments

const getAPIBaseURL = () => {
  // Check if running in browser environment
  if (typeof window !== "undefined") {
    if (window.location.hostname !== "localhost") {
      // Production: use the same hostname but different port
      return `http://${window.location.hostname}:3000`;
    }
  }

  // Development: use localhost
  return "http://localhost:3000";
};

export const API_BASE_URL = getAPIBaseURL();

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`Making API call to: ${url}`);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
