import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL; // Your backend URL

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const login = async (email: string, password: string) => {
    return await api.post('/login', { email, password });
};

export const getExpenses = async () => {
    return await api.get('/expenses');
};

export const addExpense = async (expense: any) => {
    return await api.post('/expenses', expense);
};

export const deleteExpense = async (id: string) => {
    return await api.delete(`/expenses/${id}`);
};
