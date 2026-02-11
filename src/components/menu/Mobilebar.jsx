import React,{ useState } from 'react'
import Logo from '../../img/logo.png';
import { Link } from 'react-router-dom';

import { motion } from "framer-motion";
import { FaHome, FaUser,FaTimes,FaBars ,FaSignInAlt, FaSignOutAlt, FaGamepad, FaUserFriends, FaTrophy, FaRobot, FaHistory } from 'react-icons/fa';
import { useLogout } from '../authentication/hooks/useLogout';
import { useAuthContext } from '../authentication/hooks/useAuthContext';
import "./Mobilebar.css";

const Mobilebar = () => {
  const [menuToggle,setMenuToggle]=useState(false);
  const { logout } = useLogout();
  const { user, setUser } = useAuthContext();
  
    const handleLogout = () => {
      logout();
      setUser(null);
    };

  return (
    <div className='Mobilebar'> 
         <Link to="/" className="logo">
                  <img src={ Logo }></img>
          </Link>
 {menuToggle?
   

<div className='menu-list' onClick={() => setMenuToggle(!menuToggle)}>
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
    <Link to="/"><FaHome /> Home</Link>
  </motion.div>

  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
    <Link to="/leaderboard"><FaTrophy /> Leader Board</Link>
  </motion.div>

  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
    <Link to="/gameboard"><FaGamepad /> Game Board</Link>
  </motion.div>

  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
    <Link to="/gameonline"><FaUserFriends /> Game Online</Link>
  </motion.div>

  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
    <Link to="/gamesolo"><FaRobot /> Game Solo</Link>
  </motion.div>

  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
    <Link to="/gamelog"><FaHistory /> Game Log</Link>
  </motion.div>

  {user ? (
    <>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <Link to="/profile"><FaUser /> {user.username.toUpperCase()}</Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <Link to="/" onClick={handleLogout}><FaSignOutAlt /> Logout</Link>
      </motion.div>
    </>
  ) : (
    <>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <Link to="/login"><FaSignInAlt /> Login</Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <Link to="/register"><FaUser /> Register</Link>
      </motion.div>
    </>
  )}
</div>

:<></>}
       
        <div className='menu-button'  onClick={()=>setMenuToggle(!menuToggle)}>
           {menuToggle?<FaTimes/>:<FaBars/>}
        </div>

    </div>
  )
}

export default Mobilebar