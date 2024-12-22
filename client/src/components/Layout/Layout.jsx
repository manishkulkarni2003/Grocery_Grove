import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet"
import  { Toaster } from 'react-hot-toast';

const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <div>
                  <meta name='description' content={description}/>
                  <meta name='keywords' content={keywords}/>
                  <meta name='author' content={author}/>
                </div>
                <title>{title}</title>
                
            </Helmet>
      <Header/>
      <main style={{minHeight:"70vh"}}>
      <Toaster />
      {children}
      </main>
      <Footer/>
    </div>
  )
}

//SEO
Layout.defaultProps={
  title : 'Grocery Grove-Shop Now',
  description : 'A grocery store website',
  keywords:'Mern,React,Node,MongoDb',
  author:'Manish Kulkarni'
}

export default Layout
