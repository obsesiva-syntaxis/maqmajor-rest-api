import app from './app';
import dbConnect from './database'


//conectar a la BD
dbConnect();

//levantar server
app.listen(app.get('port'), () => {
    console.log('server on port',app.get('port'));
});