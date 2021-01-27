import { MongoClient } from "mongodb";
var URL = "mongodb://localhost:27017/";

const insertDocument = (database, collection , document, size) => {
    return new Promise ((resolve,reject)=>{
        MongoClient.connect(URL, (err, db) => {
            if (err) throw err;
            const dbo = db.db(database);
            if (size > 1){
                dbo.collection(collection).insertMany(document, (err, res) => {
                    if (err) throw err;
                    console.log("documents inserted");
                    db.close();
                    resolve(res.insertedCounts)
                  });
            } else {
                dbo.collection(collection).insertOne(document, (err, res) => {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                    resolve(res.insertedCount)
                  });
            }
          });
    });
}

const updateDocument = (database, collection , query, newValue, size) => {
    return new Promise ((resolve,reject)=>{
        MongoClient.connect(URL, (err, db) => {
            if (err) throw err;
            const dbo = db.db(database);
            if (size > 1){
                dbo.collection(collection).updateMany(query, {$set:newValue}, (err, res) => {
                    if (err) throw err;
                    console.log("documents inserted");
                    db.close();
                    resolve(res.modifiedCounts)
                  });
            } else {
                dbo.collection(collection).updateOne(query, {$set:newValue}, (err, res) => {
                    if (err) throw err;
                    console.log("1 document updated");
                    db.close();
                    resolve(res.modifiedCount)
                  });
              }
          });
    });
}


const findDocument = (database, collection , document={},) => {
    return new Promise ((resolve,reject)=>{
        MongoClient.connect(URL, (err, db) => {
            if (err) throw err;
            const dbo = db.db(database);
                dbo.collection(collection).find(document).toArray( (err, res) => {
                    if (err) throw err;
                    console.log("Documnets", res);
                    db.close();
                    resolve(res)
                  });
          });
    })
}

const deleteDocument = (database, collection , document, size) => {
    return new Promise ((resolve,reject)=>{
        MongoClient.connect(URL, (err, db) => {
            if (err) throw err;
            const dbo = db.db(database);
            if (size > 1){
                dbo.collection(collection).deleteMany(document, (err, res) => {
                    if (err) throw err;
                    console.log("documents deleted");
                    db.close();
                    resolve(res.deletedCounts)
                  });
            } else {
                dbo.collection(collection).deleteOne(document, (err, res) => {
                    if (err) throw err;
                    console.log("1 document deleted");
                    db.close();
                    resolve(res.deletedCount)
                  });
            }
        });
    });
}

export const mongoFunction = {
    insertDocument,
    findDocument,
    updateDocument,
    deleteDocument
} 
