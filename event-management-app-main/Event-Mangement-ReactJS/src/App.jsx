import Chatbot from "./components/ChatBot/Chatbot";
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {routes} from "./routes/routes"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter(routes)
function App() {
  return (
    <>
    <h1>Welcome to Event Manager</h1>
    <Chatbot />
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

