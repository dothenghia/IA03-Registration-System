import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

import { GlobalProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="search" element={<SignupPage />} />
            <Route path="chat/:threadId" element={<ChatPage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}