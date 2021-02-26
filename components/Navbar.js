import Link from 'next/link'
import Login from './LogIn'
import Signup from './SignUp'
import styles from '../styles/Navbar.module.scss'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
          <Link href='/projects'>Projects</Link>
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