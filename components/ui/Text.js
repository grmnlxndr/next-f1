export const PageHeader = ({ children, ...props }) => (
  <h1
    className={'text-5xl font-sans font-semibold text-teal-800 text-center'}
    {...props}
  >
    {children}
  </h1>
)

export const SubHeader = ({ children, ...props }) => (
  <h2 className={'text-2xl font-sans text-gray-500 text-center'} {...props}>
    {children}
  </h2>
)
