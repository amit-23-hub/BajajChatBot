import Main from "./components/main/Main"
import Sidebar from "./components/sidebar/Sidebar"
import DialogflowChat from "./DialogflowChat"
require('dotenv').config();
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