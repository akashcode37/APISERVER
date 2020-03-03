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


// Start server and listen on http://localhost:8088/
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});

app.get('/user', function (req, res) {

        sqlConfig.query('select * from user', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });


})
app.get('/userfriend', function (req, res) {

                sqlConfig.query('select user_id, firstName as user, friendname from user inner join friend where user.user_id=friend.uid;', function(err, reco
rdset) {
                                    if(err) console.log(err);
                                    res.end(JSON.stringify(recordset)); // Result in JSON format
                                });


})
app.get('/userFriendOfFreind', function (req, res) {

                        sqlConfig.query('select DISTINCT     u1.uid as friendsoffriends,u3.uid as user_id     from     friend as u1      inner join friend as
u2 on u1.uid=u2.friend_id     inner join friend as u3 on u2.uid=u3.friend_id where u1.uid<>u3.uid;', function(err, recordset) {
                                                                    if(err) console.log(err);
                                                                    res.end(JSON.stringify(recordset)); // Result in JSON format
                                                                });


})
