import { useState } from 'react';
import { Modal,  ButtonToolbar, Button } from 'rsuite';
import swal from 'sweetalert';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'rsuite/dist/styles/rsuite-default.css';

const Login = () => {

    const [input, setInput] = useState({
      email:"",
      password:""
    });
    const [show, setShow] = useState(false);
    let logged;  
  
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
          console.log(logged)
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
  
    return (
        <div className="modal-container">
        <ButtonToolbar>
          <Button onClick={() => open()}>LogIn</Button>
        </ButtonToolbar>

        <Modal show={show} onHide={close}>
          <Modal.Header>
            <Modal.Title>Task Manager LogIn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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

