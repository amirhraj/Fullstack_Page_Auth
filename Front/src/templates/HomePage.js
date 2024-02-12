import React, { useState, useEffect } from 'react';
import '../templates_css/homepage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';


function HomePage (){
    const [inputLink, setInputLink] = useState('');
    const [count, setCount] = useState(0);
    const [data, setData] = useState([])

    const handleInputChange = (e) => {
      setInputLink(e.target.value);
    };
    

    function handleClick (id) {
      console.log(id)
      setData(prevData => {
        console.log(prevData, "PREVDATA")
          return prevData.map(item => {
            console.log(item, "ITEM")
              if (item.id === id) {
                updateCountOnServer(id, item.count + 1);
                  return { ...item, count: item.count + 1 };
              }
              return item;
          });
      });
  };

    useEffect(() => {
      // Выполнить запрос к серверу при загрузке компонента
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3000/api/statistics');
              setData(response.data);
              console.log(response.data, '<---Пришли данные на первичный рендер')
          } catch (error) {
              console.log(error, "Ошибка в первичных данных на рендер");
          }
      };

      fetchData();
  }, []);


  async function updateCountOnServer(id, newCount) {
    try {
        const response = await axios.post('http://localhost:3000/api/updateCount', {
            id: id,
            count: newCount
        });
        console.log(response.data);
    } catch (error) {
        console.error('Ошибка при обновлении счетчика на сервере:', error);
    }
}

    const handleSubmit =  async (e) => {
      e.preventDefault();
        try {
            const response2 = await axios.post('http://localhost:3000/api/squeeze', {
                 url : inputLink ,
                count : count
                });
            const newData = response2.data;
            // setData(prevData => [...prevData, newData]); 
            console.log(Array.isArray(newData), "ПРОВЕРКА МАССИВА")
            setData(prevData => newData.concat(prevData));
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
        {console.log((data), "----data")}
        {
    data.map(({ id, target, short, count }) => (
        <tr key={id}>
         <td> <a href={target}  target="_blank" onClick={() => handleClick(id)}>
             {short}
          </a></td>
            
            <td>{target}</td>
            <td>{count}</td>
        </tr>
    ))
}
       </tbody>
     </table>
     </div>
    )
}

export default HomePage