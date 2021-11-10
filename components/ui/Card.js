const Card = ({ children, ...props }) => (
  <div
    className={
      'w-full p-2 sm:p-4 md:p-5 bg-white rounded-xl filter drop-shadow-sm'
    }
    {...props}
  >
    {children}
  </div>
)

export default Card
