const NewPassword = () => {
  return (
    <>
      <h1 className='text-emerald-500 text-center font-black text-5xl capitalize'>
        Reestablece tu contraseña y recupera tu
        <span className='text-slate-700'> acceso</span>
      </h1>

      <form className='my-8 bg-white shadow rounded-lg px-10 p-10 '>
        <div className='mb-5'>
          <label
            htmlFor='password'
            className='text-base text-gray-600 font-bold block uppercase'
          >
            Nueva Contraseña:
          </label>
          <input
            id='password'
            type='password'
            placeholder='Escribe tu nueva contraseña'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>
        <input
          type='submit'
          value='Guardar nueva contraseña'
          className='bg-emerald-600 w-full text-white uppercase font-bold rounded-md py-3 hover:cursor-pointer hover:bg-emerald-700 transition-colors mt-3'
        />
      </form>
    </>
  )
}

export default NewPassword
