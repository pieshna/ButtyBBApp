import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'

function Login() {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/home')
    }
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    fetchPropio('auth/login', 'POST', { correo, password }).then((data) => {
      if (data) {
        sessionStorage.setItem('token', data)
        window.location.href = '/home'
      }
    })
  }

  return (
    <>
      <div className=" w-full h-screen flex flex-col justify-center items-center p-6">
        <Form
          onSubmit={handleSubmit}
          className="px-5 pt-5 pb-4 bg-pateleta-900 rounded-md"
        >
          <h1 className="text-center text-3xl pb-4">Login</h1>
          <Form.Group className="pb-2">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="pb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="flex justify-center pt-3">
            <button className="btn btn-primary">Submit</button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Login
