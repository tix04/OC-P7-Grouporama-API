# OC-P7-Grouporama-Backend
Open Classroom Project 7 Node.JS Server with express and SQL Database All npm packages already listed in package.json

Click npm install to reinstall all dependencies

### Remote Database
It is already linked to a remote SQL Database Where you can test the APP, but the remote link I use is a free remote link
which is very limited. When there are too many connections to its server the app does not function correctly.

### Local Database Backup
As a backup, I am attaching a folder with the mySQL dump from my local database.
I am using xammp and phpmyadmin. If remote database is not working to connections limit, do the Following

1 - You will need to create a database named grouporama
2 - Import the grouporama.sql file within the 'folder SQL Database' into grouporama database you created on phpmyadmin
3 - You will need to modify certain details in the middleware/databaseConnection.js file to connect to local database
    a - host key value changed to localhost
    b - user key value needs to be changed to your username
    c - password key value needs to be changed to your database password
    d -  database name key value should remain the same, but if you used another name than grouporama, then you need to match it to your database name
    
Backend is hosted on localhost:3000
