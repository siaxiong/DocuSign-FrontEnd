import React from 'react'
import LoginForm from '../UserLoginForm/LoginForm'
import FPStyle from './FrontPage.module.css'

function FrontPage() {
  return (
        <ul className={FPStyle["front-page"]}>
          <li className={FPStyle["front-page__child"]}>
            <div className={FPStyle["front-page__summary"]}>
              <h2>Are you a manager at your workplace? Do you manage a lot of paper works?</h2>
              <p>DocuSign eSignature allows anyone with an account to send PDF forms to another person who has an account. 
                We know it's painful to use regular emailing services to send a form to someone, they have to download the form,
                sign it, reupload it to their emailing service, and send it back to you. That's just too much work in the 2022!
                Here at DocuSign you can expect an easy workflow to sign PDF forms.
              </p>
            </div>
            <LoginForm/>
          </li>
          <li className={FPStyle["front-page__child"]}>
            <div>
                <h2>Here's how you do it using DocuSign</h2>
                <p>1. Upload a PDF</p>
                <p>2. Select the PDF you want to send</p>
                <p>3. Take a quick peek at it again then send to one or more people</p>
            </div>
          </li>
          <li className={FPStyle["front-page__child"]}>
          <div>
              <h2>Here's what happens on the receiver's end</h2>
                <p>1. If the PDF was sent to more than one person, with sequential signing order enabled,
                  only the person who's turn to sign the PDF will see the PDF
                </p>
                <p>2. The receiver will add their signature, approval stamp, etc (there's lots of options)
                </p>
                <p>3. The receiver click send to finish signing the PDF
                </p>
              </div>
          </li>
          <li className={FPStyle["front-page__child"]}>
            <div className={FPStyle["front-page__summary"]}>
              <h2>Watch this video</h2>
              <div className={FPStyle["loom__container"]}><iframe src="https://www.loom.com/embed/a1b73005d58d4e93aff3b2ce8cb94da0"></iframe></div>
            </div>
          </li>
          <li className={FPStyle["front-page__child"]}>
            <div className={FPStyle["front-page__summary"]}>
              <h2>Unique Features</h2>
              <ul>
                <li>
                  <p>Need to a PDF in a approval orderly manner? We have it!</p>
                </li>
                <li>
                  <p>Need to check real time who keeps forgetting to sign? You can see it!</p>
                </li>
                <li>
                  <p>Need a beautiful simple uncomplicated experience? We got you!</p>
                </li>
              </ul>
            </div>
          </li>
          <li className={FPStyle["front-page__child"]}>
            <div className={FPStyle["front-page__summary"]}>
              <h2>Upcoming Features</h2>
              <ul>
                <li>
                  <p>Want to notify users who keeps forgetting to sign? Automatic notification coming soon!</p>
                </li>
                <li>
                  <p>Need people who don't haven an account to sign forms? We'll get it done!</p>
                </li>
                <li>
                  <p>Need to sign forms on your mobile devices? We're on it!</p>
                </li>
              </ul>
            </div>
          </li>

        </ul>
  )
}

export default FrontPage
