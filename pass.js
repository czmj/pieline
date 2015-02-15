app.use(

    connection(mysql,{

  host     : 'localhost',
  user     : 'root',
  password : '3degUB7JxZa',
       port : 3306, //port mysql
        database:'jobboard'

    },'pool') //or single

);

