import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <main className='min-h-screen flex justify-center items-center p-5'>
        <div className='md:w-2/3 lg:w-2/5 2xl:w-2/6'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout
