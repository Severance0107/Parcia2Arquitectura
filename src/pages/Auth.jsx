import React, { useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Auth() {

  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () =>{
    try {
     const { data } = await clienteAxios.post('/auth/login', {email, password})
     localStorage.setItem('access_token', data.access_token)
     setAuth(data)
     navigate('/productos')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="mb-3">
        <label htmlFor="formEmail" className="form-label">Email</label>
        <input type="email" className="form-control" id="formEmail" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="formPassword" className="form-label">Contraseña</label>
        <input type="password" className="form-control" id="formPassword" placeholder="Ingresar Contraseña" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      <button type="button" className="btn btn-primary" onClick={(e) => (handleSubmit())}>Base class</button>
    </>
  )
}
