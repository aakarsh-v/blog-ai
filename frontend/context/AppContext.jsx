import {createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;

const AppContext = createContext();

export const AppProvider = ({children}) => {

    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");  

    const checkIfAdmin = (token) => {
        try {
            const decoded = jwtDecode(token);
            // Admin tokens only have email, user tokens have both email and _id
            return !decoded._id;
        } catch (error) {
            return false;
        }
    };

    const fetchBlogs = async() => {
        try {
            const {data} = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token){
            setToken(token);
            setIsAdmin(checkIfAdmin(token));
            axios.defaults.headers.common['Authorization'] = `${token}`
            // Try to get name from JWT
            try {
                const decoded = jwtDecode(token);
                if(decoded.name) setUserName(decoded.name);
            } catch {}
        }
    },[])

    const value = {
        axios, navigate, token, setToken, isAdmin, setIsAdmin, userName, setUserName, blogs, setBlogs, input, setInput
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}