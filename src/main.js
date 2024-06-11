import './assets/main.css'

import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import {
    createVuetify
} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import.meta.env;

export default createVuetify({
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
})
const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
})

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401 && error.response.data === 'Token expired') {
        localStorage.removeItem('token');
        router.push('/login');
    }
    return Promise.reject(error);
});

app.use(router)
app.use(vuetify)
app.use(VueSweetalert2);

app.mount('#app')