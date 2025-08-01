import React from 'react'
import { Navigate, replace } from 'react-router-dom'

const ProtectedWrapper = ({children}) => {

    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/login" replace />
    }


  return children
}

export default ProtectedWrapper