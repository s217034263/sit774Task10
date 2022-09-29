var express = require('express')

var app = express();
var sqlite3 = require('sqlite3').verbose();

// persistent file database "myDB".
var db = new sqlite3.Database('myDB');

//now any files in public are routed
app.use(express.static('public'));

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));

// REST endpoint for posting a new user
app.post('/users', function (req, res, next) {
    let username = req.body.name;
    let title = req.body.title;
    let comment = req.body.comment;
    let email = req.body.email;
    
    console.log("Just received POST data for users endpoint!");
    console.log(`Data includes: ${username}, ${title}, ${comment} and ${email}`);

    //insert the form data into the table User
    var stmt = db.run(`INSERT INTO User VALUES ("${username}", "${title}", "${comment}", "${email}")`);

    // still display the default web page in public folder, i.e. index.html, for next data entering 
    res.status(200).redirect('/');  
});

// REST endpoint for getting all user data
app.get('/users', function (req, res) {
    let html = '';

    // Display a web page table
    
    html += '<!doctype html><html lang="en">';
    html += '<head>';
    html += '<title>Bootstrap Express/SQLite3 Demo</title>';
    html += '<meta charset="utf-8">';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
    html += '<link rel="stylesheet"';
    html += '  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"';
    html += '  integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"';
    html += '  crossorigin="anonymous">';
    html += '</head>';

    html += '<body><div class="container">';
    html += '<h3> The User Information Table </h3>';
    html += '<table class="table">';
    html += '<thead class="thead-dark"><tr>';
    html += '<th>Name</th><th>Title</th><th>Comment</th><th>Email</th>';
    html += '<tr></thead><tbody>';
    // Retrieve data from table User on the server 
    // and display it in a web page table structure
    db.all('SELECT * FROM User', function(err, rows){
        if (err) {
            return console.error(err.message);
        }
        if (rows.length === 0) { 
            console.log("Array is empty!") 
            html += '<tr><td colspan="3"> No data found </td></tr>';
        } else {
            rows.forEach(function (row){
                html += '<tr>';
                html += '<td>'+row.name+'</td>';
                html += '<td>'+row.title+'</td>';
                html += '<td>' +row.comment+'</td>';
                html += '<td>'+row.email+'</td></tr>';
            });
        }

        html += '</tbody></table>';
        html += '</div>';
        html += '</body></html>';
        res.send( html );
    });
});

// create a Node.js server that listens on port 3000.
app.listen (process.env.PORT || 3000, function () {
   console.log('Usman_s app is listening on port 3000!');
})