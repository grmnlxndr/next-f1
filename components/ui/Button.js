const Button = ({ children, ...props }) => {
  return (
    <button
      className={
        'px-5 py-2 text-white border-b-2 border-teal-800 bg-teal-600 hover:bg-teal-500 hover:border-teal-600 font-semibold rounded filter drop-shadow'
      }
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
