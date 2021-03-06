import React from 'react'
import LoginForm from '../UserLoginForm/LoginForm'
import FPStyle from './FrontPage.module.css'

function FrontPage() {
  return (
    
    <>
        <ul className={FPStyle["front-page"]}>
          <li className={FPStyle["front-page__child"]}>
            <div className={FPStyle["front-page__summary"]}>
              <h2>Lorem Ipsum</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <LoginForm/>
          </li>
          <li className={FPStyle["front-page__child"]}>
            <div className={FPStyle["front-page__summary"]}>
              <h2>Lorem Ipsum</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </li>
          <li className={FPStyle["front-page__child"]}>
            <div className={FPStyle["front-page__summary"]}>
              <h2>Lorem Ipsum</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </li>

        </ul>

    </>
  )
}

export default FrontPage
