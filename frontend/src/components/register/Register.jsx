import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import {useDispatch} from "react-redux"
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setUserpass] = useState("");
      
  const dispatch = useDispatch ();
  const navigate = useNavigate ();


  const handleRegister = (e) => {
      // khi regis thanh cong => not refresh page
      e.preventDefault();
      const newUser = {
        email: email,  
        username: username,
        password: password
      };
      registerUser(newUser, dispatch, navigate)
  }
  
  return ( 
        <section className="register-container">
              <div className="register-title"> Sign up </div>
            <form onSubmit={handleRegister}>
                <label>EMAIL</label>
                <input 
                    type="text" 
                    placeholder="Enter your email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>USERNAME</label>
                <input 
                    type="text" 
                    placeholder="Enter your username" 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>PASSWORD</label>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    onChange={(e) => setUserpass(e.target.value)}
                />

                <button type="submit"> Create account </button>
                <div className="login-register"> Have a account yet ? </div>
                <Link className="login-register-link" to="/login">Log in now </Link>
            </form>
        </section>
        
     );
}
 
export default Register;