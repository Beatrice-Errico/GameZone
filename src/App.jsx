import { RouterProvider } from "react-router";
import router from "./routing/router";
import SessionProvider from "./context/SessionProvider";
import FavoriteProvider from "./context/FavoriteProvider";

function App() {

  
  return (
    <>
      <SessionProvider>
        <FavoriteProvider>
      <RouterProvider router={router}/>
      </FavoriteProvider>
      </SessionProvider>
    </>

  )
}
export default App;