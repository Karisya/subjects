import axios from "axios";


export const api = axios.create({
    baseURL: "https://bgaa.by/test"
}) 

export const getSubject= async ()=>{
    const res = await api.get("")
    console.log(res.data.data)
    return res.data.data
}