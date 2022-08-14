import React from 'react'
import Header from "../view/navbar/header";
import Footer from "../view/navbar/footer";
import PCB from "../view/pcb";
import Terminate from "../view/terminate";

function index() {
  return (
    <>
      <Header />
        <PCB />
        <Terminate />
      <Footer />
    </>
  )
}

export default index