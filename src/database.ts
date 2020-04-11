import { connect, connection } from 'mongoose';
import color from 'colors';
import './lib/env';

const URI = 'mongodb://adminMajor:maqmajor123@161.35.5.29:27017/majorbd?authSource=admin';
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
