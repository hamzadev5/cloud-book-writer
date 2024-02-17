import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your JSON Server URL

const AuthService = {
    signup: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/users`, { email, password, role: "user" });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    login: async (email, password) => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    addBook: async (title, sectionsArray) => {
        try {
            const response = await axios.post(`${API_URL}/books`, { title, sectionsArray });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getBooks: async () => {
        try {
            const response = await axios.get(`${API_URL}/books`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default AuthService;
