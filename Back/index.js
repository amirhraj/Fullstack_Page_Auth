const http = require('http')
const url = require('url')
const mysql = require('mysql2');


http.createServer((req, resp) =>{
    console.log('server work')
    let urlReq = url.parse(req.url, true)
    console.log(urlReq)
    resp.end('не гуд')
}).listen(3000)







const connection = mysql.createConnection({
  host     : '172.20.0.5',
  port : 3306,
  user     : 'root',
  password : 'test',
  database : 'People'
});

connection.connect( err =>{
    if (err){
        console.log(err)
        return err
    } 
    console.log('GOOOD')
}


);

connection.query('SELECT * FROM Users', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});



