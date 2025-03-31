import Main from "./components/main/Main"
import Sidebar from "./components/sidebar/Sidebar"
import DialogflowChat from "./DialogflowChat"
import.meta.env;

const App = () => {
  return (
    <>
      <Sidebar/>
      <Main/>
      <DialogflowChat />
    </>
  )
}

export default App