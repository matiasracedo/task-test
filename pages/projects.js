import { useState, useEffect } from 'react';
import ResponsiveNav from '@rsuite/responsive-nav';
import { Icon, Button, Input } from 'rsuite';
import axios from 'redaxios';
import swal from 'sweetalert';
import { firebase } from '../src/firebase';
import "firebase/auth";
import 'rsuite/dist/styles/rsuite-default.css';
import styles from '../styles/projects.module.scss'
import TaskList from '../components/TaskList.js';


export default function Projects() {
    const [activeKey, setActiveKey] = useState('');
    const [items, setItems] = useState([]);
    const [input, setInput] = useState("")
    const [session, setSession] = useState(false);
    const [update, setUpdate] = useState(false);
 
  
    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user){
          setSession(user);
          axios.get(`/api/projects/projectList?user=${user.uid}`)
          .then(projects => {
          setItems(projects.data)})
          items?.length === 1 && setActiveKey(items[0].id)
        }
        else setSession(false);
      })
    },[update])


    const handleClick = async (name, session) => {
      try {
        await axios.post('/api/projects/add', { name, user: session.uid })
        setUpdate(!update)
        items?.length === 1 && setActiveKey(items[0].id)
      } catch (err) {
        swal(`Error`, `Please try again.`, `error`);
      }
    }

    const handleDelete = async (id) => {
      try {
        await axios.delete(`/api/projects/delete?id=${id}`)
        let newItems = items.filter(item => item.id !== id)
        setItems(newItems)
        setUpdate(!update)
        setActiveKey(items[0].id)
      } catch(error) {
        swal(`Error`, `Please try again.`, `error`);
      }
    }

    return (
        <>
        <div className={styles.projectsNav}>
        <Input style={{ width: 250 }} value={input} onChange={value => setInput(value)} placeholder="Project name" />
        <Button
          appearance="primary"
          onClick={() => {
            /* const nextItems = [
              ...items,
              {
                eventKey: items.length,
                name: `${input}`
              }
            ]; */
            /* setItems(nextItems); */
            handleClick(input, session);
            setInput("");
          }}
        >
          New Project
        </Button>
        <ResponsiveNav
          className={styles.responsiveNav}
          appearance="tabs"
          moreText={<Icon icon="more" />}
          moreProps={{ noCaret: true }}
          activeKey={activeKey}
          onSelect={(e) => {
            setActiveKey(e);
          }}
        >
          {items?.map((item, i) => (
            <ResponsiveNav.Item key={i} eventKey={item.id}>
              {item.name}
              <button onClick={() => {handleDelete(item.id)}}>X</button>
            </ResponsiveNav.Item>
          ))}
        </ResponsiveNav>
      </div>
      <div className={styles.taskContainer}>
        {activeKey ? <TaskList title={activeKey} /> : <h2>Por favor selecciona o crea un proyecto</h2>}  
      </div>
      </>
    )
}
