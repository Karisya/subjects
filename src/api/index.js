import axios from "axios";

export const api = axios.create({
    baseURL: "https://bgaa.by/test"
}) 

export const getSubject= async ()=>{
    const res = await api.get("")
    return res.data.data
}

export const getTeachers= async ()=>{
    const res = await api.get("")
    return res.data.teachers
}