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
import { BrowserRouter, Route, Routes } from "react-router-dom"
export default function App() {
  return (<>

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
          <Route path='/mails' element={<Mails />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='*' element={<><div>page is under construction</div></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>)
  // fetch modify data while modifing ata i service page to be done
}