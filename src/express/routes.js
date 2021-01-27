import express from 'express';
import { mongoFunction } from '../mongodb/connection'
import { json, urlencoded,  } from 'body-parser';
import cros from 'cors'
const PORT = 2000;
const app = express();
const dataBase = 'Hotels';
const collection = 'tables';
const document = {
    name:'table1',
    total_seats: 4,
    occupied_seats: 4,
};
const query = {name: 'table5'}
app.use(json());
app.use(urlencoded({extended:true}));
app.use(cros());
 const connectToExpress = async () =>{

    app.get('/tables', async (req, res)=>{
        const data =  await mongoFunction.findDocument(dataBase,collection);
        console.log('data', data);
        res.send(data)
    })

    app.post('/tables', async (req, res)=>{
        console.log("reqbody", req.body);
        const data =  await mongoFunction.insertDocument(dataBase,collection,req.body,1);
        console.log('Tables Inserted count : ', data);
        res.sendStatus(200)
    });

    app.put('/tables', async (req, res)=>{
        console.log("reqbody", req.body);
        const data =  await mongoFunction.updateDocument(dataBase, collection, query, req.body, 1);
        console.log('Tables updated count : ', data);
        res.sendStatus(200)
    });

    app.delete('/tables', async (req, res)=>{
        console.log("reqbody", req.body);
        const data =  await mongoFunction.deleteDocument(dataBase, collection, req.body, 1);
        console.log('Tables deleted count : ', data);
        res.sendStatus(200)
    });

    app.listen(PORT, ()=>{
        console.log('connected to port ' + PORT);
    })   
     
}


export const expressFunction = {
    connectToExpress,
}