import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Modal,  ButtonToolbar, Button } from 'rsuite';
import swal from 'sweetalert';
import { firebase } from '../src/firebase';
import 'firebase/auth';
import 'rsuite/dist/styles/rsuite-default.css';
import styles from '../styles/Modals.module.scss';

const Login = () => {
    const [input, setInput] = useState({
      email:"",
      password:""
    });
    const [show, setShow] = useState(false);
    const [session, setSession] = useState(false);
    let logged;  
    const router = useRouter();
  
    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) setSession(user);
        else setSession(false);
      });
    },[session])
    const login = async () => {
      if(input.email && input.password){
          const { user } = await firebase.auth().signInWithEmailAndPassword(input.email, input.password);
          logged = user;
      } else {    
          swal(`Error`, `There are missing fields`, `error`)
      }
    };
    const close = () => setShow(false);

    const open = () => setShow(true);

    const handleClick = async () => {
        await login();
        if (logged) {
            setInput({
              email:"",
              password:""
            })
            close();
            return swal(`Hello!`, `Welcome to Task Manager.`, `success`)
        } else {
            return swal(`Error`, `Please try again`, `error`)
        }
    }
  
    const logout = () => {
      firebase.auth().signOut().then(() => {
        setSession(false)
        router.push('/');
        return swal(`Good bye!`, `Come back soon!`, `success`)
      }).catch((error) => {
        return swal(`Error`, `Please try again`, `error`)
      });
    }

    return (
        <div className="modal-container">
        <ButtonToolbar>
          {session ? <Button className={styles.logoutbtn} onClick={() => logout()}>LogOut</Button> :
          <Button className={styles.loginbtn} onClick={() => open()}>LogIn</Button>}
        </ButtonToolbar>

        <Modal show={show} onHide={close}>
          <Modal.Header>
            <Modal.Title>Task Manager LogIn</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalform}>
            <label>Email</label>  
            <input
                type="text"
                placeholder="example@mail.com"
                value={input.email}
                onChange={e => setInput({ ...input, email: e.target.value })}
            />
            <label>Password</label>  
            <input
                type="password"
                placeholder="Password"
                value={input.password}
                onChange={e => setInput({ ...input, password: e.target.value })}
            />    
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClick} appearance="primary">
              LogIn
            </Button>
            <Button onClick={close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  export default Login;

