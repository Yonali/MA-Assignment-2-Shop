import api from "../axios";
const resource = '/api/user';

const resource1 = '/api/orders';

export default {
    listPrduct: () => api.get(`${resource}`),
    updateMe: (payload) => api.post(`${resource}/updateME`,payload),
    deleteME: () => api.delete(`${resource}/deleteME`),
    placeOrder: (payload) => api.post(`${resource1}`,payload),
    getMyeOrder: () => api.get(`${resource1}`)
}