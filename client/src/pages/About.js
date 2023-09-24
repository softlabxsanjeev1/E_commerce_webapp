import React from 'react'
import Layout from '../components/layout/Layout'

const About = () => {
  return (
    <Layout>
      <div className="row contactus " style={{marginTop:"100px"}}>
        <div className="col-md-6 mx-4">
          <img
            src="https://kinsta.com/wp-content/uploads/2021/11/about-us-page-1024x512.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 ms-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About