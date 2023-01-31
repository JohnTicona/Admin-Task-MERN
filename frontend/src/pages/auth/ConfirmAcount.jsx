import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import clientAxios from '../../config/clientAxios'

const ConfirmAcount = () => {
  const [alert, setAlert] = useState({})
  const [acountConfirm, setAcountConfirm] = useState(false)

  const { token } = useParams()

  useEffect(() => {
    const confirmAcount = async () => {
      try {
        const url = `/users/check/${token}`
        const { data } = await clientAxios.get(url)
        setAlert({
          msg: data.msg,
          error: false
        })
        setAcountConfirm(true)
      } catch (error) {
        return setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmAcount()

    // return () => confirmAcount()
  }, [])

  return (
    <div>
      <h1 className='text-emerald-500 text-center font-black text-5xl capitalize'>
        Confirma tu cuenta y comienza a crear tus proyectos
        <span className='text-slate-700'> acceso</span>
      </h1>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rouded-xl bg-white'>
        {alert.msg && <Alert alert={alert} />}
        {acountConfirm &&
          <Link
            to='/'
            className='text-2xl block text-center text-slate-500 font-bold mt-5'
          >Inicia Sesión
          </Link>}
      </div>
    </div>
  )
}

export default ConfirmAcount
