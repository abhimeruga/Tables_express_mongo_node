import { mongoFunction } from "./src/mongodb/connection";
import { expressFunction } from './src/express/routes'
const dataBase = 'Hotel';
const collection = 'tables';
const document = {
    name:'table1',
    total_seats: 4,
    occupied_seats: 4,
};
expressFunction.connectToExpress();
//mongoFunction.insertDocument(dataBase,collection,document,1);
//mongoFunction.findDocument(dataBase,collection,document);
