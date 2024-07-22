import "./App.css";
import Card from "./components/Card/Card";
import JobsGrid from "./components/JobsGrid/JobsGrid";
import Home from "./pages/Home/Home";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import JobPost from "./pages/Job-Post/JobPost";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SingleJob from "./pages/SingleJob/SingleJob";
import ApplyJob from "./pages/ApplyJob/ApplyJob";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/post-job",
      element: (
        <>
          <Header />
          <JobPost />
          <Footer />
        </>
      ),
    },
    {
      path: "/job/:id",
      element: (
        <>
          <Header />
          <SingleJob />
          <Footer />
        </>
      ),
    },
    {
      path: "/apply",
      element: (
        <>
          <Header />
          <ApplyJob />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Header />
          <Login />
          <Footer />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Header />
          <Signup />
          <Footer />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
