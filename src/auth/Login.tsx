import { useEffect } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import { useNavigate } from 'react-router-dom'
import FormularioPropio from '../components/Formularios/Formulario'
import { estructuraFormularioLogin } from './estructuraLogin'

function Login() {
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
      <div className=" w-full h-screen flex flex-col justify-center items-center p-6 bg-pateleta-200">
        <div className="px-5 pt-5 pb-4 bg-pateleta-400 rounded-md shadow-2xl">
          <div className="flex flex-col items-center">
            <img src="/logo.png" alt="logo" className="w-44" />
          </div>

          <p className="text-center text-xl pb-4">Iniciar Sesion</p>
          <FormularioPropio
            datosAMostrar={{}}
            formData={estructuraFormularioLogin}
            onSubmitFunction={handleSubmit}
            textoBoton="Iniciar Sesion"
          />
        </div>
      </div>
    </>
  )
}

export default Login
