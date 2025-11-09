
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from "react"
import { MdMenu, MdClose } from 'react-icons/md'
import { useContext } from 'react'
import { isAuthenticated } from '../admin/AuthenticatedContext'
export default function RightMenu() {

    const { AdminStatus, setAdminStatus } = useContext(isAuthenticated)
    const pathname = useLocation().pathname
    const page = pathname == '/' ? 'home' : pathname.replace('/', '')


    const [isMenubarClicked, setMenubarClicked] = useState(false)
    const setMenubar = () => {
        setMenubarClicked(!isMenubarClicked)
    }

    return (<>

        <div className={` ${isMenubarClicked ? 'w-[250px]' : 'w-[50px] h-fit'}  absolute h-full md:static transition-[width]  duration-1000 ease-in-out  z-[30]   right-0`}>
            <div className={`bg-darkGray md:bg-dark  flex ${isMenubarClicked ? 'pl-4' : 'justify-center'} h-[70px] items-center`}>
                {isMenubarClicked ?
                    <MdClose className="lg:text-2xl text-textSecondary " onClick={setMenubar} />
                    :
                    <MdMenu className="lg:text-2xl  text-textSecondary " onClick={setMenubar} />
                }

            </div>

            <div className="flex justify-center  items-center  text-textSecondary uppercase ">
                {!isMenubarClicked && <div className={`mt-[130px] rotate-90 lg:block absolute  hidden`}>{page}</div>}

                {isMenubarClicked &&
                    <>
                        <div onClick={setMenubar} className="flex  h-[90vh] flex-col w-full bg-dark md:bg-darkGray ">
                            <div className="mt-[100px]  w-full p-5 text-sm ">
                                <ul className="flex flex-col gap-2 ">
                                    <NavLink to='/' className={({ isActive }) => (isActive ? 'text-white font-semibold' : '')}>Home</NavLink>
                                    <NavLink to='/portfolio' className={({ isActive }) => (isActive ? 'text-[white]  font-semibold' : '')}>Portfolio</NavLink>
                                    <NavLink to='/history' className={({ isActive }) => (isActive ? 'text-white  font-semibold' : '')}>History</NavLink>
                                    <NavLink to='/blog' className={({ isActive }) => (isActive ? 'text-white  font-semibold' : '')}>Blog</NavLink>
                                </ul>
                            </div>
                            <hr className="bg-textSecondary w-full h-[1px] my-5" />
                            <div className=" w-full p-5 text-sm ">
                                <ul className="flex flex-col gap-2 ">
                                    <NavLink to='/contact' className={({ isActive }) => (isActive ? 'text-white  font-semibold' : '')}>Contact</NavLink>
                                    <NavLink to='/donate' className={({ isActive }) => (isActive ? 'text-white font-semibold' : '')}>donate</NavLink>
                                    <NavLink to='/mentorship' className={({ isActive }) => (isActive ? 'text-[white]  font-semibold' : '')}>MentorShip</NavLink>
                                </ul>
                            </div>
                            {AdminStatus &&
                                <> <hr className="bg-textSecondary w-full h-[1px] my-5" />
                                    <div className=" w-full p-5 text-sm ">
                                        <ul className="flex flex-col gap-2 ">
                                            <NavLink to='/mails' className={({ isActive }) => (isActive ? 'text-white  font-semibold ' : '')}>Mails</NavLink>
                                        </ul>
                                    </div>
                                    <hr className="bg-textSecondary w-full h-[1px] my-5" />
                                    <div className=" w-fit p-5 text-sm">
                                        <ul className="flex flex-col gap-2 ">
                                            <button className=' capitalize bg-accent rounded-xl px-5 py-2 text-dark hover:scale-110' onClick={
                                                async () => {
                                                    const req = await fetch(`${import.meta.env.VITE_BACKEND}/logout`)
                                                    const res = await req.json()
                                                    if (res.success) {
                                                        setAdminStatus(false)
                                                    }
                                                    else {
                                                        alert('Error while logout')
                                                    }
                                                }
                                            }>Logout</button>
                                        </ul>
                                    </div>
                                </>}
                        </div>
                    </>
                }
            </div>


        </div>

    </>)
}