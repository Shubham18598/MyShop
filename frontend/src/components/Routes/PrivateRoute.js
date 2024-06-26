import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'
import { useAuth } from '../../context/auth'

const PrivateRoute = () => {
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()

    useEffect(()=>{
        const authCheck=async()=>{
            const res= await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`)

            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }

        if(auth?.token){
            authCheck()
        }
    },[auth?.token])

  return ok ? <Outlet/> : <Spinner/>
}

export default PrivateRoute