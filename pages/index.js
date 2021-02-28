import styles from '../styles/index.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to Task Manager!
        </h1>
        <p className={styles.description}>See all projects going on across your team, in one place.</p>
        <img src='https://www.freeiconspng.com/uploads/task-manager-icon-14.png' alt='app icon' />
    </div>
  )
}
