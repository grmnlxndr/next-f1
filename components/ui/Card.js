const Card = ({ children, ...props }) => (
  <div
    className={'w-full p-2 sm:p-4 md:p-5 bg-white rounded-xl drop-shadow-xl'}
    {...props}
  >
    {children}
  </div>
)

export default Card
