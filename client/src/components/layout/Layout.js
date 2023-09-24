import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <>
         <Header/>
      <main style={{ minHeight: "content-fit", marginTop: "50px" }}>
        <div style={{position:"fixed",zIndex:"9999",
          inset:"30px",pointerEvents:"none"}}></div>
        <img alt='banner' 
        src='https://sleepy-teal-cape.cyclic.app/images/banner.png' 
        width="100%" height="250px"/>
        <Toaster position="top-right" />
            {children}
         </main>
         <Footer/>
    </>
  )
}

export default Layout