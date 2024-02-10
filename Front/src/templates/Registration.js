import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../templates_css/registration.css'


function Registration(){
    const [loginname, setLoginname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [stringDefault, setStringDefault] =  useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isvalid, setValid] = useState("")
    const [isvalidLogin, setValidLogin] = useState("")
    const history = useNavigate();



    function handleLoginChange (e)  {
      const loginRegex = /^\S*$/;
      const value = e.target.value;
      setLoginname(value);
      const isValidLogin = loginRegex.test(value);
      console.log(isValidLogin, "Valid")
      if (isValidLogin){
        setValidLogin("")
      } else {
        setValidLogin("Не верный логин")
      }
      
      
    };

    function handleEmailChange (e)  {
      const value = e.target.value;
      setEmail(value);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);
      
      if (isValidEmail){
        setValid("")
      } else {
        setValid("не правильный email");
      }
    };

    function handlePasswordChange (e)  {
      setPassword(e.target.value);
    };

    function handleRepeatPasswordChange (e)  {
      setRepeatPass(e.target.value);
    };


    function chekPass (){
      if ( password === repeatPass) {
        setIsLoading(true)
      } else {
        setIsLoading(false)
      }
        
    }

  
    async  function handleSubmit (e) {
      e.preventDefault();
      try {
       
        if (password === repeatPass){
          console.log(password, repeatPass)
          setIsLoading(true)
          const response2 = await axios.post('http://localhost:3000/api/register', { login: loginname , email: email , password : password  });
          const data = response2.data;
          if (response2.data === 'OK'){
            console.log('Response from server:', data);
            history('/home')
          }
            console.log('Response from server:', data);
        }
    

       
      
      } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
      }
      console.log('Отправка данных:', { loginname, email, password });
    };




    return(
        <div  className='conteiner'>
            <form className='form_regist'  onSubmit={handleSubmit}>
         <Link className='Link' to="/"><p>Вход</p></Link>
        <div className='input_form'>
          <label>Login</label>
          <input
            type="text"
          
            value={loginname}
            onChange={handleLoginChange}
            required
          />
          <div>{isvalidLogin}</div>
        </div>
        <div className='input_form'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div>{isvalid}</div>
        </div>
        <div className='input_form'>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className='input_form'>
          <label>Повторить пароль:</label>
          <input
            type="password"
            value={repeatPass}
            onChange={handleRepeatPasswordChange}
            required
          />
        </div>
        <div className='passErrMesage'>{password === repeatPass ? '': "Пароли не похожи попробуйте снова"}</div>
        {/* <Link className='Link' to={isLoading ? "/home" : "/regist"} >  */}
        <button className='submit_regis' type="submit">Зарегистрироваться</button>
         {/* </Link> */}
        
      </form>
     
        </div>
       
    )
}

export default Registration