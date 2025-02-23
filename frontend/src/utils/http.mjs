import axios from 'axios'

export const http = axios.create({
    baseURL: "http://127.0.0.1:8080",
    headers:{
        "Accept": "application/json",
        "Content-Type": "application/json" 
    }
})
