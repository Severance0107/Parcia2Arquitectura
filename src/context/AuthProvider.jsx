import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        autenticarUsuario()
    },[])
    
    const autenticarUsuario = async () => {
        const token = localStorage.getItem('access_token')
        if(!token){
            setCargando(false)
            return
        }

        setAuth({access_token:token})
        navigate('/productos')
        setCargando(false)
    }
    
    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;