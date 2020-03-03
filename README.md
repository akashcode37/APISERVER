## APISERVER - TO model user and its friends relationship
I have created API using Nodejs, mysql and EXPRESS

 ## NODEJS - used to create REST API
 ## MYSQL - DATABASE used to show realtionship model of friends
 ## EXPRESS - used for api rounting
Lets get started!
1. Create a table of user information.
Query- create table user(user_id int primary key, firstName varchar(255), lastName varchar(255), avatar varchar(255));
Now made same entries in this table by using --
Query- insert into user(user_id, firtname, lasname, avatar) values
2. create another table to show the  friend realtionship between users.
query- create table friend (uid int references user(user_id), friend_id int references user(user_id), friendname varchar(255));
Again make the enteries in this as well.


 ### SQL QUERIES
 ## to get user information
 SELECT * from user;
 ## to get the friends of the user
 SELECT user_id, firstName as user, friendname from user inner join friend where user.user_id=friend.uid;
 ## to get the friends of friends of the user
 SElECT DISTINCT     u1.uid as friendsoffriends,u3.uid as user_id     from     friend as u1      inner join friend as
u2 on u1.uid=u2.friend_id     inner join friend as u3 on u2.uid=u3.friend_id where u1.uid<>u3.uid;


Now the schema for the api is ready we have to intialize the project
## In linux 
make folder - mkdir firstapp 
cd firstappp -- download Nodejs by yum 
yum install nodejs -y    it will download the nodejs application
To craete api we need to initialize it by using -
npm init -y # it will create a package.json file that i have in this repo
# to connect with mysql we need to dwonload another package by using npm
npm install mysql
npm install express
# then write a api in a file 
touch app.js

const express = require('express'); // Web Framework
const app = express();
const sql = require('mysql'); // MS Sql Server client
const bodyParser= require('body-parser');

// Connection string parameters.
var sqlConfig = sql.createConnection ( {
    user: 'root',
    password: 'redhat',
    server: 'localhost',
    database: 'project'
});
sqlConfig.connect(function(err) {
          if (err) throw err
          console.log('You are now connected with mysql database...')
})
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
          extended: true
}));


// Start server and listen on http://localhost:3000
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});
### API Endpoint for fetching users

app.get('/user', function (req, res) {

        sqlConfig.query('select * from user', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });


})

### API Endpoint for fetching a user’s friends

app.get('/userfriend', function (req, res) {

                sqlConfig.query('select user_id, firstName as user, friendname from user inner join friend where user.user_id=friend.uid;', function(err, reco
rdset) {
                                    if(err) console.log(err);
                                    res.end(JSON.stringify(recordset)); // Result in JSON format
                                });


})

### API Endpoint for fetching a user’s friends of friends

app.get('/userFriendOfFreind', function (req, res) {

                        sqlConfig.query('select DISTINCT     u1.uid as friendsoffriends,u3.uid as user_id     from     friend as u1      inner join friend as
u2 on u1.uid=u2.friend_id     inner join friend as u3 on u2.uid=u3.friend_id where u1.uid<>u3.uid;', function(err, recordset) {
                                                                    if(err) console.log(err);
                                                                    res.end(JSON.stringify(recordset)); // Result in JSON format
                                                                });


})
            
            
            
            
            
 # now just run this file by using 
 node app.js
 
 ### the api wil run on http://localhost:3000/#API
      
 
