import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TopNavCSS from './TopNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAngleDown
   } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../Auth/AuthContext/AuthContext';


export default function TopNav() {

  const {myToken, setToken} = useAuthContext();
  const [developerMode, setDeveloperMode] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    navigate("/")

  }

  const toggleDeveloperMode = () => setDeveloperMode(!developerMode);

  return (
    <div className={TopNavCSS["Top-Nav"]}>
      
      {
      (myToken && !developerMode) ?       
        <ul>
          <li><a href="/">DocuSign eSignature</a></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/manage">Manage</Link></li>
          <li><Link to="/">Profile</Link></li>
          <li><a onClick={logout}>Logout</a></li>
          <li><a href="#">{myToken.email}</a></li>
        </ul> 
        :       
        <ul>
          <li><a href="#">DocuSign eSignature</a></li>
          <li><a href="#">Soutions <FontAwesomeIcon icon={faAngleDown} size="xs"/></a></li>
          <li><a href="#">Products <FontAwesomeIcon icon={faAngleDown} size="xs"/></a></li>
          <li><a href="#">Pricing <FontAwesomeIcon icon={faAngleDown} size="xs"/></a></li>
          <li><a href="#">A Working Prototype</a></li>
        </ul>
       }
    </div>


  )
}
