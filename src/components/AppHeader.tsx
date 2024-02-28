// Hello, {user}!
// There are ... todos

export const AppHeader = () => {
  return (
    <>
      <header className="flex justify-center items-center mt-10 mb-10">
        <div className="flex flex-col justify-center mr-4">
          <h1>Hello, T4YR0Z</h1>
          <p>Your todo's for today:</p>
        </div>
        <div className="flex items-center justify-center w-24 h-24 bg-orange-600 rounded-full ml-4">
          <span className="text-white font-bold" style={{ fontSize: '2rem' }}>
            6
          </span>
        </div>
      </header>
    </>
  )
}
