# MongoDB_NodeApp

# 預先掌握的觀念

(1) 依照版本，可以使用 Mongoose 驅動程式或是 MongoDB Client 模組

(2) 經過安裝與引用（導入）至應用程式後

(3) 宣告定義中會需要路徑 url 抑或 uri 來做初始化

(4) 請熟記常用 code 如下：

       const client = new MongoClient(uri, { }); // 第二參數的物件通常是設定
       MongoClient.connect(url, callback) // 回呼通常是 query
       MongoClient.connect.once
       MongoClient.connect.on()
       MongoClient.conncect.on( , db.close());
       
(5) 關於 query 通常會使用由 MongoDB 或是 MySQL 建立的 db，可命名為 mydb，當芒果DB Client 初始化參數時，使用的 url 通常就夾帶著 mydb 這名稱，而初始化的第二參數此回呼中的第二個參數聆聽的是 db 事件，一但聆聽到，便會觸發程式碼執行敘述句，可能是 console.log()。

      
       MongoClient.conncect.on( , db.close());
       
       
(6) 芒果DB 預設埠號通常是 27017,無論是否透過 Atlas 或是其他平台。


       mongodb://localhost:27017/
       


相關參考教育資源： https://www.w3schools.com/nodejs/nodejs_mongodb.asp

# the functionality in MongoDB is as same as  MySQL


    //A document in MongoDB is the same as a record in MySQL.
    

# npm install to download module

目前最新版本需要使用 Mongoose 驅動程式, 請詳
https://github.com/QuinoaPy/MongDB_Connection

    $npm install mongodb
   --------------------------------
    $npm install mongoose
   
    
# include module to app (aim at DB Manipulation)

目前最新版本需要使用 Mongoose 驅動程式, 請詳
https://github.com/QuinoaPy/MongDB_Connection

    var mongo = require('mongodb');
   --------------------------------
    var mongoose = require('mongoose');
    
# App.js config

https://github.com/QuinoaPy/MongoDB_hosted_in_Cloud/blob/master/app.js

    //Import the mongoose module
    var mongoose = require('mongoose');
    
    
    //Set up default mongoose connection
    var mongoDB = ’insert_your_database_url_here‘ ;

    //url may be -> 'mongodb+srv://katechen:010101@locallibrary-2m7tu.azure.mongodb.net/test?retryWrites=true&w=majority';

    mongoose.connect(mongoDB);

    mongoose.connect('mongodb+srv://katechen:010101@locallibrary-2m7tu.azure.mongodb.net/test', 
    { useNewUrlParser: true, 
      useUnifiedTopology: true,    
      useFindAndModify: false,
      useCreateIndex: true,
      reconnectTries: 30,
      reconnectInterval: 500, // in ms
    });

    mongoose.connection.once('open',() => {
      console.log('connceted to database.')
    });


    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    
    //Get the default connection
    var db = mongoose.connection;

    // Atlas | all mongoDB clusters operate on port 27017
    //Bind connection to error event (to get notification of connection errors)
    
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
# Detail in mongoose connection

If the password contains reserved URI characters, you must escape the characters per RFC 2396. 

For example, if your password is @bc123, you must escape the @ character when specifying the password in the connection string; 

e.g. %40bc123.

"useNewUrlParser" option and removing retryWrites from the url fixed the problem.

# Mongo DB version up to 3.4+, able to use its Client

then replace below code to above code in App.js to config MongoDB module
Using MongoClient ~~~

    const MongoClient = require('mongodb').MongoClient;
    
    const uri = "mongodb+srv://katechen:010101@locallibrary-2m7tu.azure.mongodb.net/test?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true});
    
    client.connect(err => {
    
         // using code as below 
         //perform actions on the collection object
         const collection = client.db("").collection("");
          
         client.close();
         
     });

# save db code

mongoDB default port is 27017

https://docs.mongodb.com/manual/reference/default-mongodb-port/

save db in local as mydb

save below code as db.js and run it using cli called 

    $ node db.js
    
    >Database created!

local url

    var url = "mongodb://localhost:27017/mydb";
    
DB connection, below code saved as db.js

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/mydb";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      db.close();
    });
    
# create DB Collection

https://github.com/QuinoaPy/MongoDB_NodeApp/blob/master/collection_create.js

save below code as collection_create.js and run it using cli called 

    $ node collection_create.js
    
    >Collection created!

reuseful code

      db is the event listened by the MongoClient while calling connect method.
      var dbo = db.db("mydb");
      dbo.createCollection();

code

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.createCollection("customer_name", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
    });

# Insert Doc in {} format

https://github.com/QuinoaPy/MongoDB_NodeApp/blob/master/insert_doc.js

"Object-format Document is uesed as a default data type in MongoDB."

save below code as insert_db.js and run it using cli called 

    $ node insert_doc.js 
    
    >1 document inserted ~

reuseful code

    var dbo = db.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("customer_name").insertOne()

code

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = { name: "Company Inc", address: "Highway 37" };
      dbo.collection("customer_name").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted ~ ");
        db.close();
      });
    });
    
# .findone() method called

save below code as findone.js and run cli as 

    $ node findone.js
    > Company Inc.

To select data from a collection in MongoDB, we can use the findOne() method.
The findOne() method returns the first occurrence in the selection.
The first parameter of the findOne() method is a query object. In this example we use an empty query object, which selects all documents in a collection (but returns only the first document).

reuseful code

      var dbo = db.db("mydb");
      dbo.collection("customer_name").findOne({}, callback)

code

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("customers").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.name);
        db.close();
      });
    });
    
# .find(query) method called

https://github.com/QuinoaPy/MongoDB_NodeApp/blob/master/query.js

save below code as query.js and run cli as 

    $ node query.js
    > [
        {  _id: 58fdbf5c0ef8a50b4cdd9a8e , 
           name: 'Ben', address: 'Park Lane 38' 
         }
      ]

reuseful code

      var dbo = db.db("mydb");
      var query = { address: "Park Lane 38" }; // query is an object
      dbo.collection("customer_name").find(query).toArray(callback)

/*When finding documents in a collection, you can filter the result by using a query object.The first argument of the find() method is a query object, and is used to limit the search.*/

code

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var query = { address: "Park Lane 38" };
      dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
