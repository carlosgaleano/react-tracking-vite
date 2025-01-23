import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
interface Props {
    isAllowed: boolean,
    children: React.ReactNode
}

export const ProtecteRoute=( {isAllowed,children}:  Props)=>{

    console.log('Allowed',isAllowed);
    if(!isAllowed) return <Navigate to={"/"} />
    return children? <>{children}</>: <Outlet /> ;

}