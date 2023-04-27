// drone database interface
export interface IDrone {
    serialnumber:number,
    model:string,
    weightLimit:number,
    batteryCapacity:number,
    state:string,
    createdAt:Date,
    updatedAt:Date
}
//  drone input interface i.e when adding up drone to the system
export interface IDroneInput {
    model:number,
    serial_number:string,
    weight_limit:number,
    battery_capacity:number,
    state:string,
}
// medication load interface
export interface IMedication {
    "name": string, "weight": number,
    "code": string, "image": string
}