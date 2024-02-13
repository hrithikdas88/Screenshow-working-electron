import Signin from './components/Sign in '

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Signin />
    </>
  )
}

export default App
