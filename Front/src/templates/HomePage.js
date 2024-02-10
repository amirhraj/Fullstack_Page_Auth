import React, { useState } from 'react';
import '../templates_css/homepage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';


function HomePage (){
    const [inputLink, setInputLink] = useState('');
    const [count, setCount] = useState(0);

    const handleInputChange = (e) => {
      setInputLink(e.target.value);
    };
  
    const handleSubmit =  async (e) => {
      e.preventDefault();
        try {
            const response2 = await axios.post('http://localhost:3000/api/squeeze', {
                 url : inputLink 
                
                });
            const data = response2.data;
            console.log(data, '<---data')
            
        } catch (e) {
            console.log(e)
        }
    };

    return(
        <div className='home_content'>
        <form className='home_form' onSubmit={handleSubmit}>
        <label>
          Вставте ссылку:
          <input 
            className='home_input'
            type="text"
            value={inputLink}
            onChange={handleInputChange}
            required
          />
        </label>
        <button className='home_submit' type="submit">Сжать</button>
      </form>
       <table className='home_table'>
       <thead>
         <tr>
           <th>Короткая ссылка</th>
           <th>Исходная ссылка</th>
           <th>Количество переходов по ссылке</th> 
           {/* Добавьте другие заголовки здесь, если необходимо */}
         </tr>
       </thead>
       <tbody>
         {/* Место для добавления данных таблицы */}
       </tbody>
     </table>
     </div>
    )
}

export default HomePage