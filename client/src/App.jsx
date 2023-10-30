import { BrowserRouter } from "react-router-dom";
import { JiboProvider } from "./Context/JiboContext";
import { AppRoutes } from "../../client/src/Routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <JiboProvider>
        <AppRoutes />
      </JiboProvider>
    </BrowserRouter>
  );
}

export default App;
