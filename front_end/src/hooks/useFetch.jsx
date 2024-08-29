import axios from "axios";
import { useAuth } from "./useAuth";

export default function useFetch(){
    const {user} = useAuth()
    
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_SERVER_BASE_URL,
        headers: {
            Authorization: 'Bearer '+user?.token
        }
    })

    const fetch = async({ method = 'get', path = '/', value = {} }) => {
        try {
            const resp = await axiosInstance[method](path, value)
            return { status: true, data: resp.data.data }
        } catch (error) {
            if(!error?.response) return { status: false, message: 'Network error' }
            if(error.response.data.errors) return { status: false, message: `${error.response.data.message}:\n- ${Object.values(error.response.data.errors).map(v => v.join('\n- ')).join('\n- ')}` }
            if(error.response.data.message) return { sattus: false, message: error.response.data.message }
        }
    }

    return { axiosInstance, fetch }
}