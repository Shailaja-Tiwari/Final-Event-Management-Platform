import EventList from "../pages/EventList/EventList"
import FilterEvents from "../pages/FilterEvents/FilterEvents"
import EventDetail from "../pages/EventDetails/EventDetails"
import EventHero from "../pages/Hero_page/Hero_page"
import AboutUs from "../pages/AboutUS/aboutus"
import Sponsors from "../pages/Sponsor/Sponsor"
import ContactUs from "../pages/ContactUs/contact"
import Register from "../pages/Register/Register"
import Login from "../pages/Login/Login"
import Ticket from "../pages/Ticket/Ticket"
import EventCalendar from "../pages/Calendar/EventCalendar"
import Home from '../pages/Home';

export const routes = [
  
  {path:'/',element:<EventHero/>},
  {path:'/find-events',element:<FilterEvents/>},
  {path:'/events/:id',element:<EventDetail/>},
  {path:'/aboutus',element:<AboutUs/>},
  {path:'/sponsor',element:<Sponsors/>},
  {path:'/contact',element:<ContactUs/>},
  {path:'/login',element:<Login/>},
  {path:'/register',element:<Register/>},
  {path:'/gettickets',element:<Ticket/>},
  {path:'/calendar',element:<EventCalendar/>},
  {path: '/home',element: <Home />
  }
  
]