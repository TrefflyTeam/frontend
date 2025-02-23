import { useEffect } from "react"

function App() {
  useEffect(() => {
    fetch("https://treffly.ru/api/test").then(res => {
      console.debug(res);
    })
    fetch("/api/test").then(res => {
      console.debug(res);
    })
    fetch("https://localhost/api/test").then(res => {
      console.debug(res);
    })
  }, []);

  return (
    <>
      Hello from frontend!
    </>
  )
}

export default App
