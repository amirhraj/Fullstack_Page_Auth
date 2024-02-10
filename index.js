const http = require('http')
const url = require('url')
const mysql = require('mysql2');
// const { nanoid } = require('nanoid');
const shortid = require('shortid');
const { channel } = require('diagnostics_channel');




 http.createServer((req, res) =>{
  console.log("server start")
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    // Отправляем ответ на предварительный запрос OPTIONS с необходимыми заголовками CORS
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
}



    if (req.method === 'POST' && req.url === '/api/login') {
        let data = '';
        req.on('data', chunk => {
          data += chunk.toString();
        });
   
        req.on('end', () => {
          const body = JSON.parse(data);
          const username = body.email;
          const password = body.password;

          const connection = mysql.createConnection({
            host     : '172.20.0.5',
            port : 3306,
            user     : 'root',
            password : 'test',
            database : 'People'
          });
          
          connection.connect( err =>{
              if (err){
                  console.log("упала с ошибк" ,err)
                
              } 
              console.log('GOOOD')
          }
          );
          
          connection.query('SELECT * FROM Users', function (error, results, fields) {
            if (error) {
              console.log("Выпала ошибка ",error)
            }
         
            // console.log(results, "RESULTS BACK")
            //alin@gmail.com
            //alin123
            const resultRespons = results.some(user=>{
              // console.log(user.pass , password, user.email ,username, "WHAT RESULT")
              // console.log(user.email === username && user.pass === password, "WHAT RESULT22")
              if (user.email === username && user.pass === password){
                console.log( "=====Cработало правило")
                return true 
              } else {
                return false
              }
              
             
            })
            const finalResult = resultRespons ? 'OK' : 'NOT FOUND';
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            console.log(finalResult, "finalResult")
            res.end(finalResult);
          });
          connection.end();
        });



      
      } else {
    //     res.writeHead(404, { 'Content-Type': 'text/plain' });
    //   return   res.end('Страница не найдена\n');
      }


      if (req.method === 'POST' && req.url === '/api/register'){

                let data = '';
                    req.on('data', chunk => {
                    data += chunk.toString();
                 });

                 req.on('end', () => {
                  const body = JSON.parse(data);
                  const login = body.login;
                  const username = body.email;
                  const password = body.password;
        
                  const connection = mysql.createConnection({
                    host     : '172.20.0.5',
                    port : 3306,
                    user     : 'root',
                    password : 'test',
                    database : 'People'
                  });
                  
                  connection.connect( err =>{
                      if (err){
                          console.log("упала с ошибк" ,err)
                       } 
                      console.log('GOOOD')
                  });

                  const sql = `INSERT INTO Users (  login, email, pass, toker) VALUES ( ?, ?, ?, ?)`;
                  const values = [login, username, password, ""];
                  let resultRespons
                  connection.query(sql, values, function (error, results, fields) {
                    if (error) {
                      console.log("Выпала ошибка ",error)
                      resultRespons = error
                    }
                    resultRespons = 'OK'
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end( resultRespons);
                    console.log(resultRespons, "----RESULT");
                  });
                  connection.end();
              
                });

      }


      if (req.method === 'POST' && req.url === '/api/squeeze'){
             
                 let data = '';
                  req.on('data', chunk => {
                  data += chunk.toString();
                  });


              req.on('end', () => {
                     const body = JSON.parse(data);
                    let  longUrl = body.url;
                    let hashUri = `http//${shortid.generate()}`
                     console.log(hashUri, "<---URI")

                     const connection = mysql.createConnection({
                       host     : '172.20.0.5',
                       port : 3306,
                       user     : 'root',
                       password : 'test',
                       database : 'People'
                     })

                   connection.connect( err =>{
                     if (err){
                         console.log("упала с ошибк" ,err)
                      } 
                     console.log('GOOOD')
                     });

                     const sqlSelect = 'SELECT * FROM Users WHERE target = ?';
                     const sqlInsert = `INSERT INTO Link (  short, target, count) VALUES ( ?, ?, ?)`;
                     const values = [hashUri, longUrl, 0,];

   

                     connection.query(sqlSelect, [longUrl], function (error, results, fields) {
                      console.log(results , "RESULTS")
                                   if (error) {
                                       console.log("Выпала ошибка ",error)
                                       res.end("Такой url существует");
                                  }

                                  if ( !results  || results.length === 0 ){
                                    connection.query(sqlInsert, values, function (error, results, fields) {
                                      
                                           if (error) {
                                                 console.log("Выпала ошибка  при вставке ссылок",error)
                                                resultRespons = error
                                          }
                                              resultRespons = 'OK'
                                              res.writeHead(200, { 'Content-Type': 'text/plain' });
                                               res.end(resultRespons);
                                      });
                                  }

                       })
               
                       connection.end();




            
              });




      }

   
}).listen(3000)






