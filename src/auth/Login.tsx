import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import FormularioPropio from '../components/Formularios/Formulario'
import { estructuraFormularioLogin } from './estructuraLogin'

function Login() {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/home')
    }
  })

  function handleSubmit(datosEnvio: Record<string, string>) {
    fetchPropio('auth/login', 'POST', datosEnvio).then((data) => {
      if (data) {
        sessionStorage.setItem('token', data)
        window.location.href = '/home'
      }
    })
  }

  return (
    <>
      <div className=" w-full h-screen flex flex-col justify-center items-center p-6">
        <div className="px-5 pt-5 pb-4 bg-pateleta-400 rounded-md">
          <p className="text-center text-xl pb-4">Login</p>
          <FormularioPropio
            datosAMostrar={{}}
            formData={estructuraFormularioLogin}
            onSubmitFunction={handleSubmit}
          />
        </div>
      </div>
    </>
  )
}

export default Login
