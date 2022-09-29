var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('myDB');      // file database

db.serialize(function() {
        
    db.run("CREATE TABLE IF NOT EXISTS User (name TEXT, title TEXT, comment TEXT, email TEXT)");

    db.run("DELETE FROM User");
    db.run(`INSERT INTO User (name, title, comment, email) VALUES ("Jason", "deakin2017", "JD", "J@deakin.edu.au")`);
    db.run(`INSERT INTO User (name, title, comment, email) VALUES ("Karl", "deakin2016", "KD", "K@deakin.edu.au")`);
    db.run(`INSERT INTO User (name, title, comment, email) VALUES ("Belgrave", "barby", "BD" , "B@deakin.edu.au")`);
    // NOTE: The order of the fields relates to the order of the Values provided
    db.run(`INSERT INTO User ( title, name, comment, email) VALUES ("cooldeakin", "Alice", "AD" , "A@deakin.edu.au")`);    
    
    // The SELECT operation is performed on the DB one row at a time and the function
    // is called for each row 'selected'
    console.log('Display all content from all rows of the DB');
    db.each("SELECT * FROM User", function(err, row) {
        console.log("[all] Name: " + row.name + "  title: " + row.title + "  comment: " + row.comment + "  email: " + row.email); 
    });
    // Or you can select 'specific' fields from a data row
    console.log('Display only the name and option fields from all rows of the DB');
    db.each("SELECT name, option FROM User", function(err, row) {
        console.log("[subset] Name: " + row.name + "  Title: " + row.title); 
    });
});
app.listen(process.env.PORT || 3000, function () {
    console.log('Usman_s app is listening on port 3000!');
 })
db.close();