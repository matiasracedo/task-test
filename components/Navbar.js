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
        <li>
          <Link href='/'>Home</Link>
          {session ? <Link href='/projects'>Projects</Link> : null}
        </li>
      </ul>
      <div>
        <Login />
        <Signup />
      </div>
    </nav>
  )
}

export default Navbar