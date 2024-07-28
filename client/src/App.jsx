import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Dashboard from "./components/Dashboard";
import Board from "./components/pages/Board";
import Create from "./components/pages/Create";
import Edit from "./components/pages/Edit";
import DetailPost from "./components/pages/DetailPost";
import Error from "./components/pages/Error";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import AllPosts from "./components/pages/AllPosts"
import ContactForm from "./components/pages/Contact"
import About from "./components/pages/About"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<AllPosts />} />
          <Route path="posts/:slug" element={<DetailPost />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route path="contact" element={<ContactForm />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route index element={<Board />} />
          <Route path="create" element={<Create />} />
          <Route path="edit/:slug" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
