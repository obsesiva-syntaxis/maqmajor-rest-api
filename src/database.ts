import { connect, connection } from 'mongoose';
import color from 'colors';
import './lib/env';


const URI = 'mongodb://'+process.env.MONGODB_URI+':27017/majorbd';
export default function dbConnect(){
    connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    connection.on('open', () => {
        console.log(color.random('DATABASE is conected!'));
    });
}
