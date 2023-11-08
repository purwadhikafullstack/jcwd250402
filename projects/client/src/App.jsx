import { ResetPassword, Tenant, Home } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <main>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Tenant />} />
      </Routes>
    </main>
  );
}

export default App;
