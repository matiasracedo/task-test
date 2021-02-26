
import styles from '../styles/Task.module.scss'

const Task = ({ status, tasks, handleDelete, handleEdit }) => {

    return (
        <div className={styles.task}>
            <h6>{status}</h6>
            <ul>
            {tasks.map( (task, i) => (
            <span key={i}>
                <p>{task.task}</p>
                {task?.status !== 'completed' ? <button className={styles.edit} onClick={() => {handleEdit(task.id, task.status === 'pending' ? 'in process' : 'completed')}}>✓</button> : null}
                <button className={styles.delete} onClick={() => {handleDelete(task.id)}}>✘</button>
            </span>)
            )}
            </ul>
        </div>
    )
}

export default Task