import React from 'react'
import Banner from '../banner/banner'
import Card from '../card/card'
import Header from '../header/header'
import Trailer from '../trailer/Trailer'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
       <div>
          <Header/>
          <Banner />
       </div>
       <Outlet />
    </>
   
  )
}

export default Home
