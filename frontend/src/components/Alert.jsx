const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? 'from-red-400 to-red-600' : 'from-emerald-500 to-emerald-600'
      } bg-gradient-to-br text-center text-white p-3 rounded-xl uppercase mt-5 font-bold`}
    >
      {alert.msg}
    </div>
  )
}

export default Alert
