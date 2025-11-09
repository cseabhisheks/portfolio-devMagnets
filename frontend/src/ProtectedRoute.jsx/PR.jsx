import { useContext } from "react"
import { isAuthenticated } from "../admin/AuthenticatedContext"
import { Children } from "react"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
export default function PR(){
    const {AdminStatus}=useContext(isAuthenticated)
    return(
    AdminStatus?<Outlet/>:<Navigate to='/admin'/>
    
    )
}