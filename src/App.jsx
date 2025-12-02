import AppRouter from "./routes/router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: { fontSize: "14px" }
        }}
      />
    </>
  );
}

export default App;
