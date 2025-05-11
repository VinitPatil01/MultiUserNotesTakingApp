import axios from "axios";
import { getToken } from "./StudentServices";

export function getCategories(){
    return axios.get("http://localhost:9000/notes/getallcategories");
}

export async function getNotesbyId(note_id,token){
    return axios.get(`http://localhost:9000/notes/${note_id}`,{
        headers:{'Authorization':`Beare ${token}`}
    })
}


export async function updateNotes(note_id,token,editedText){
    console.log(note_id)
    return axios.put(`http://localhost:9000/notes/${note_id}`,
        {text:editedText},
        {headers:{'Authorization':`Beare ${token}`}
    })
}

export async function getSelfNotes(token){
    return axios.get(`http://localhost:9000/student/selfnotes`,{
        headers:{'Authorization':`Beare ${token}`}
    })
}


export async function getGroupNotes(token){
    return axios.get(`http://localhost:9000/student/groupnotes`,{
        headers:{'Authorization':`Beare ${token}`}
    })
}

export async function filterNotesByCategories(category_id,token){
     return axios.post(`http://localhost:9000/notes/filterbycategories`,
        {category_id},
        {headers:{'Authorization':`Bearer ${token}`}
    })
}

export async function uploadNotes(formData,token){
    return axios.post("http://localhost:9000/notes/upload", formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
}



