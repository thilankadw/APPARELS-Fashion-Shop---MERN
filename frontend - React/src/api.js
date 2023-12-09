import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3080/api',
});

const handleTokenRefresh = async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = Cookies.get('refreshToken');

    if (refreshToken) {
      try {
        const response = await axios.post('/user/refresh-access-token', { refreshToken });
        const newAccessToken = response.data.accessToken;

        // Update access token in localStorage
        Cookies.set('accessToken', newAccessToken, { expires: 7 });

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error, e.g., logout the user or redirect to the login page
        console.error('Refresh token failed', refreshError);
      }
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('Error in request', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      return handleTokenRefresh(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;