import Link from 'next/link'
import styles from '../styles/Navbar.module.scss'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
      </ul>
      <div>
        <button>Login</button>
        <button>Sign up</button>
      </div>
    </nav>
  )
}

export default Navbar