const ErrorCustomer = () => {
  return (
    <article className="h-screen flex justify-center items-center">
      <div className="max-w-[500px] ">
          <h1 className="text-4xl text-center">Oops, something went wrong while fetching the data.. Please try again later or refresh.</h1>
          <span className="text-center block my-4">We're working to resolve the issue.</span>
    </div>

    </article>
  )
}

export default ErrorCustomer