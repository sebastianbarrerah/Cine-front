import React from 'react'
import { Outlet } from 'react-router-dom'

function PrivateRoutes({isAutenticated}) {
  return (
    <div>{
        isAutenticated && <Outlet /> 
      }</div>
  )
}


export default PrivateRoutes