// application imports
import express, { Application, Request, Response } from 'express';
import droneRoute from './routes/drone';
import medicationRoute from './routes/medication';
import { log } from 'console';
import sequelize from './database/config';
import bodyParser from 'body-parser';
import startPeriodicTask from './job/periodic-task';

// initializing express application
const app: Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// index route
app.get('/', (req: Request, res: Response) => {res.send('Hello World!');});

app.use("/drone", droneRoute);
app.use("/medication", medicationRoute);

// connecting to database
sequelize.sync()
.then(() => { // starting the priodic job
  startPeriodicTask(); 
  log("Connection successfully established");
})
.catch(e => { 
  log(`connection error: ${e.message}`);
});  
// app listening on port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});