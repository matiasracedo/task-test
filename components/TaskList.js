import { useEffect, useState } from 'react';
import axios from 'redaxios';
import Task from './Task';
import swal from 'sweetalert';
import { Button, Input } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import styles from '../styles/TaskList.module.scss';

const TaskList = ({ title }) => {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState("")
    const [update, setUpdate] = useState(false);


    useEffect(() => {
            axios.get(`/api/tasks/list?project=${title}`)
            .then(tasks => {
            setItems(tasks.data)})
      },[title, update])

      const handleClick = async (task, project) => {
        try {
          await axios.post('/api/tasks/add', { task, project })
          setUpdate(!update)
        } catch (err) {
          swal(`Error`, `Please try again.`, `error`);
        }
      }

      const handleDelete = async (id) => {
        try {
          await axios.delete(`/api/tasks/delete?id=${id}`)
          setUpdate(!update)
        } catch(error) {
          swal(`Error`, `Please try again.`, `error`);
        }
      }

      const handleEdit = async (id, status) => {
        try {
          await axios.put(`/api/tasks/update?id=${id}&status=${status}`)
          setUpdate(!update)
        } catch(error) {
          swal(`Error`, `Please try again.`, `error`);
        }
      }

    return (
        <>
            <h4>Project: {title.split('_')[1]}</h4>
            <Input style={{ width: 250 }} value={input} onChange={value => setInput(value)} placeholder="Task title" />
            <Button
                appearance="primary"
                onClick={() => {
                    handleClick(input, title);
                    setInput("");
                }}
            >
                New Task
        </Button>
            <div className={styles.tasklist}>
                <Task status='pending'handleEdit={handleEdit} handleDelete={handleDelete} tasks={items.filter(item => item.status === 'pending')} />
                <Task status='in process' handleEdit={handleEdit} handleDelete={handleDelete} tasks={items.filter(item => item.status === 'in process')} />
                <Task status='completed' handleDelete={handleDelete} tasks={items.filter(item => item.status === 'completed')} />
            </div>
        </>
    )
}

export default TaskList