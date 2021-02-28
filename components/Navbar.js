import { useState, useEffect } from 'react';
import Link from 'next/link';
import Login from './LogIn';
import Signup from './SignUp';
import { firebase } from '../src/firebase';
import styles from '../styles/Navbar.module.scss';


const Navbar = () => {
  const [session, setSession] = useState(false);
  
    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) setSession(user);
        else setSession(false);
      });
    },[session])

  return (
    <nav className={styles.nav}>
      <ul>
      <img src='https://www.freeiconspng.com/uploads/task-manager-icon-14.png' alt='app icon' width='35px' height='35px' />
        <li>
          <Link href='/'>Home</Link>
          {session ? <Link href='/projects'>Projects</Link> : null}
        </li>
      </ul>
      <div>
        <Login />
        {session ? null : <Signup />}
      </div>
    </nav>
  )
}

export default Navbar