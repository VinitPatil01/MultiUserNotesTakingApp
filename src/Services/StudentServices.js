import axios from 'axios';

export function getToken(){
    return localStorage.token
}
 
var token = getToken();
export function registerStudent(formData){
    return axios.post('http://localhost:9000/student/', formData);
}

export function studentLogin(formData){
    return axios.post('http://localhost:9000/student/login',formData)
}


export function storeToken(token){
    
    return localStorage.setItem("token",token)
}


export function getDasboard(token){
    return axios.get("http://localhost:9000/student/Dashboard",{
        headers:{'Authorization':`Bearer ${token}`}
    })
}

export async function getStudentProfile(token){
    return axios.get(`http://localhost:9000/student/profile`,{
        headers:{'Authorization':`Beare ${token}`}
    })
}