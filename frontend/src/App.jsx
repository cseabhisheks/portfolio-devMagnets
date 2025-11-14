import RightMenu from "./component/RightMenu"
import Home from "./pages/home/Home"
import PublicLayout from "./layout/PublicLayout"
import Contact from "./pages/contact/Contact"
import Portfolio from "./pages/portfolio/Portfolio"
import Blog from "./pages/blog/Blog"
import History from "./pages/history/History"
import Donation from "./pages/donation/Donate"
import MentorShip from "./pages/mentorship/Mentorship"
import Mails from "./pages/mails/Mails"
import Admin from "./admin/Admin"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { isAuthenticated } from "./admin/AuthenticatedContext.js"
import { useState,useEffect } from "react"
import PR from "./ProtectedRoute.jsx/PR.jsx"
export default function App() {

    const [AdminStatus, setAdminStatus] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 new

  useEffect(() => {
    console.log(import.meta.env.MODE);
    const backend = import.meta.env.VITE_BACKEND;
    fetch(`${backend}/admin/isAuthenticated`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setAdminStatus(data.loggedIn);
        setLoading(false);
      })
      .catch(() => {
        setAdminStatus(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-white">Checking session...</div>;
  }
  return (<>

    <isAuthenticated.Provider value={{ AdminStatus, setAdminStatus }}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='history' element={<History />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/donate' element={<Donation />} />
            <Route path='/mentorship' element={<MentorShip />} />
            <Route element={<PR />}>
              <Route path='/mails' element={<Mails />} />
            </Route>
            <Route path='/admin' element={<Admin />} />
            <Route path='*' element={<><div>page is under construction</div></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </isAuthenticated.Provider>
  </>)
  // fetch modify data while modifing ata i service page to be done
}