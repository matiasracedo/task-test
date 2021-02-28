import Navbar from './Navbar'
import Meta from './Meta'
import Footer from './Footer'
import styles from '../styles/Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Meta />  
      <Navbar />  
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Layout