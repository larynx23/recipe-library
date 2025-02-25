import axios from 'axios'

export const http = axios.create({
    baseURL: "http://127.0.0.1:8080/api",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true
})

const token = localStorage.getItem('token')
if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
