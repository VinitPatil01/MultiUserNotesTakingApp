import axios from 'axios';

export function registerStudent(formData){
    return axios.post('http://localhost:9000/student/', formData);
}

export function studentLogin(formData){
    return axios.post('http://localhost:9000/student/login',formData)
}

export function getToken(){
    return localStorage.token
}

export function storeToken(token){
    
    return localStorage.setItem("token",token)
}

export function getDasboard(){
    return axios.get("http://localhost:9000/student/Dashboard",{
        headers:{'Authorization':`Bearer ${token}`}
    })
}

export function myNotes(){
    return axios.get("http://localhost:9000/student/selfnotes",{
        headers:{'Authorization':`Bearer ${token}`}
    })
}


export function groupNotes(){
    return axios.get("http://localhost:9000/student/groupnotes",{
        headers:{'Authorization':`Bearer ${token}`}
    })
}

