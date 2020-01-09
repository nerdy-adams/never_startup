// load config file
const app = require('../.config/.app.config');
// router
app.use('/', require('../routes/router'));
// server start 
app.listen(app.get('port'), () => { console.log(`- Server Start ${ app.get('port') } Port -`)});
