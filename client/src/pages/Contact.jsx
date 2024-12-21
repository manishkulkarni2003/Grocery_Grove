import React from 'react'
import Layout from '../components/Layout/Layout'
import { MdContactMail } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";


const Contact = () => {
  return (
    <Layout title={"Contact us-Grocery Grove"}>
      <div className="row contactus">
    <div className="col-md-6">
      <img src="images/contact.jpeg" alt="contactus" style={{width:"100%"}} />
    </div>
    <div className="col-md-4">
      <h1 className="bg-dark p-2 text-white text-center">
      Contact Us
      </h1>
      <p className="text-justify mt-2">
    Any Query And Info About Product Feel Free To call Anytime we are 24x7 available
      </p>
      <p className="mt-3">
      <MdContactMail />:mk3304939@gmail.com
      </p>
      <p className="mt-3">
      <IoMdContact />:bento.me/manishkulkarni
      </p>
      <p className="mt-3">
      <IoLogoGithub />:manishkulkarni2003
      </p>
    </div>


      </div>
    </Layout>
  )
}

export default Contact
