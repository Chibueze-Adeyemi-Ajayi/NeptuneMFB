import { log } from 'console';
import { scheduleJob, Job } from 'node-schedule';
import { History } from '../models/droneBatteryHistoryModel';
import { Drone } from '../models/droneModel';

// Assumption is made here that there is a remote connection IOT
// with the dispatching loading thereby, returning it's current battery level
// and updating the battery level history

async function dependentFunction(callback: () => void) : Promise<void> {
  // select drones and update there batter
  const history = await History.findAll();
  for (const drone_data of history) { log(history)
    const historyid = drone_data.id;
    const serial_number = drone_data.drone_id;
    var battery_level:number = drone_data.battery_level;
    // the IOT call will be made to update the battery level
    // but here we asumme to reduce by 5
    battery_level -= 5;
    await History.update({battery_level:battery_level},{
        where: {id:historyid}
    });
  }
  callback();
}

function periodicTask():void {
  // Your periodic task logic here
    log("Periodic task");
}

// the task runs every 5 minutes
function startPeriodicTask () : void {
    (scheduleJob('*/5 * * * *', ():void => {
        dependentFunction(() => {
            periodicTask();
        });
    }))();
}

export default startPeriodicTask
