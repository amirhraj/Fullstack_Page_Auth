import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isvalidLogin, setValidLogin] = useState("")
  const history = useNavigate();




 function handleUsernameChange (e)  {
  const value = e.target.value;
  setUsername(value);
  const loginRegex = /^\S*$/;
  const isValidLogin = loginRegex.test(value)
  if (isValidLogin){
    setValidLogin("")
  } else {
    setValidLogin("не правильный email");
  }
    
  };

  function handlePasswordChange (e)  {
    setPassword(e.target.value);
  };


  async function handleClick (){
    try {
      // const response = await axios.get('http://localhost:3000/api/data');
      const response2 = await axios.post('http://localhost:3000/api/login', { email: username , password : password  });
      const data = response2.data;
      console.log(data, "Daata")
      if (data === 'OK'){
        setIsLoading(true)
        history('/home')
      } 
       
     
     
    } catch (error) {
      console.error('Ошибка при получении данных:', error.message);
    }
  };
  



  return (
    <div className="App">

<div className='Auth_block'>
<h2>Авторизация</h2>
  <div className='text_block'>
          <Link className='Link' to="/home"><p>Вход</p></Link>
          <Link className='Link' to="/regist"><p>Регистрация</p></Link>  
  </div>
      
     
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form className='form_submit' onSubmit={(e) => { e.preventDefault();  }}>
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder='Введите email'
            value={username}
            onChange={handleUsernameChange}
          />
          <div>{isvalidLogin}</div>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder='Введите пароль'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Link className='Link' to={isLoading ? "/home" : "/"} >
             <button className='submit'  onClick={handleClick} type="submit" disabled={isLoading}>Войти</button>
        </Link>
        <div className='form_registration'>
          <p>Забыли пароль ?</p>
      </div>
      </form>

    </div>
    </div>
  );
}

export default App;
