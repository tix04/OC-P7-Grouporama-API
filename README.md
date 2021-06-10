# OC-P7-Grouporama-Backend
Open Classroom Project 7 Node.JS Server with express and SQL Database All npm packages already listed in package.json

Click npm install to reinstall all dependencies

### Remote Database
It is already linked by default to a remote SQL Database Where you can test the APP. It is a little slow when fetching data
but it functions correctly. If you prefer for faster testing consult the local database backup section below.

### Local Database Backup
As a backup, I am attaching a folder with the mySQL dump from my local database within this REPO inside the SQL Database Folder.
I am using xammp and phpmyadmin. If remote database seems slow to you and you also wish to see the database, follow the instructions below

1 - You will need to create a database named grouporama in your phpmyadmin dashboard/UI.(You can name it something else if you wish)
2 - Import the grouporama.sql file within the 'folder SQL Database' into grouporama database you created on phpmyadmin
3 - You will need to modify certain details in the middleware folder/databaseConnection.js file to connect to local database
    a - Comment out the remote database code, uncomment local database code
    b - host key value changed to localhost
    c - user key value needs to be changed to your username
    d - password key value needs to be changed to your database password
    e -  database name key value should remain the same, but if you used another name than grouporama, then you need to match it to your database name
    
Backend is hosted on localhost:3000
