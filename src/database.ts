import { connect, connection } from 'mongoose';
import color from 'colors';
import './lib/env';


const URI = 'mongodb://64.227.23.122:27017/majorbd';
export default function dbConnect(){
    connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    connection.on('open', () => {
        console.log(color.random('DATABASE is conected!'));
    });
}
