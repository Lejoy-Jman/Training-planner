import Localhost from '../../Http/http';

const loginapiService = {
  login: async (email, password) => {
    try {
      const response = await Localhost.post(`users/`, {
        email,
        password,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  registerUser: async (userData) => {
    try {
      const response = await Localhost.post(`users/signin`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default loginapiService;
