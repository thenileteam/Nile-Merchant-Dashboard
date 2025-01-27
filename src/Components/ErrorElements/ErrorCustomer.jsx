const ErrorCustomer = () => {
  return (
    <article className="flex justify-center items-center">
      <div className="max-w-[500px] ">
          <h1 className="text-4xl text-center">Oops, something went wrong while fetching the data.. Please try again later.</h1>
          <span className="text-center block">We're working to resolve the issue.</span>
    </div>

    </article>
  )
}

export default ErrorCustomer