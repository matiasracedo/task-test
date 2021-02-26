import { useState } from 'react';
import { Modal,  ButtonToolbar, Button } from 'rsuite';
import swal from 'sweetalert';
import { firebase } from '../src/firebase';
import 'firebase/auth';
import axios from 'redaxios';
import 'rsuite/dist/styles/rsuite-default.css';

const Signup = () => {

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [show, setShow] = useState(false);
    
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
  
    const signup = async () => {
        const { firstName, lastName, email, password } = input;
        if(firstName && lastName && email && password){
            try{
             const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
             if(user) {
                 const result = await axios.post('/api/register', {firstName, lastName, email, id: user.uid});
                 swal(`Welcome!`, `Your account was successfully created.`, `success`)
                 setInput({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                })
                close();
             }
            } catch (error) {
                swal(`Error`, `Please try again.`, `error`);
                
            }

        } else {
            swal(`Error`, `There are missing fields!`, `error`);
        }
    }
    const close = () => setShow(false);

    const open = () => setShow(true);

    const handleClick = () => {
        signup();
    }
  
    return (
        <div className="modal-container">
        <ButtonToolbar>
          <Button onClick={open}>Sign Up</Button>
        </ButtonToolbar>

        <Modal show={show} onHide={close}>
          <Modal.Header>
            <Modal.Title>Task Manager Sign Up Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>First name</label>  
            <input
                type="text"
                placeholder="John"
                name="firstName"
                value={input.firstName}
                onChange={handleChange}
            />
            <label>Last name</label>  
            <input
                type="text"
                placeholder="Doe"
                name="lastName"
                value={input.lastName}
                onChange={handleChange}
            />
            <label>Email</label>  
            <input
                type="text"
                placeholder="example@mail.com"
                name="email"
                value={input.email}
                onChange={handleChange}
            />
            <label>Password</label>  
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={input.password}
                onChange={handleChange}
            />    
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClick} appearance="primary">
              Sign up
            </Button>
            <Button onClick={close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  export default Signup;

