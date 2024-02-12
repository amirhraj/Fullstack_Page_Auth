# Fullstack_Page_Auth
## Описание
Full-stack приложение с авторизацией сокращает ссылку 
Было реализовано авторизация, регистрация, валидация пароля, валидация email
поднято все на Docker

Front на React
Back на Node.js

### Установка
что-бы запустить программу вам необходимо иметь установленную 
--node.js
--docker
```
git clone git@github.com:amirhraj/Fullstack_Page_Auth.git
```

### Установка зависимостей
заходим в папку Front  команда 
``` npm install ```
заходим в корневую папку где лежит бэк в файле index.js
``` npm install ```
так загрузятся зависимости

### поднятие хостов
потом командой  docker compose up --build  поднимаем три контейнера 
msql
app 
phpadmin

приложение работает 

чтобы запустить React приложение заходим в Front папку делаем ``` npm start ```  можете заходить с дефолтного порта
чтобы зайти в клиент БД адрес
``` localhost:8080  ```

email и логин для входа

alin@gmail.com
alin123

![Страница регистрации](https://github.com/amirhraj/Fullstack_Page_Auth/blob/main/Auth.PNG)

![Страница авторизации](https://github.com/amirhraj/Fullstack_Page_Auth/blob/main/Registration.PNG)
