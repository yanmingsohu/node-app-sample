# Sample nodejs web app framework

Only simple modification can be used for back-end application development.
Requires nodejs> 6.9.2, npm> 3.0
A running mysql> 5.0, username and password: root/root, or modify the configuration in db.js.

installation:

`npm install`

start up:

`npm start`

Browser access:

`http://localhost:8080/web`


# File directory description

```
index.js            - program  start entry
logs                - log directory
www                 - web front-end file directory
lib                 - source code directory
lib/db.js           - database configuration
lib/log.js          - log configuration
lib/service-demo.js - service template, refer to the description
```

# Dependent module description

[express](http://expressjs.com/)

Use this module to decompose http routing and provide basic http-related APIs.

[mysql](https://github.com/mysqljs/mysql)

mysql driver.

[log4js](https://github.com/log4js-node/log4js-node)

Log library


# Secondary development process

1. Modify lib/db.js to connect to the database correctly.
2. Using lib/service-demo.js as a template, copy the file as a new module.
3. Write the api interface in the new module.
4. Write the front end in the www directory.