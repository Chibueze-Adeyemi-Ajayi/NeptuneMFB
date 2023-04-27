// response from middleware

interface IResponse {
  status : boolean, // status boolean
  message?: string, // message string
  other?: any, // other
  data?: any[] // data array
}

export declare global {
    namespace Express {
      interface Request {
        middleWareResponse: IResponse;
      }
    }
  }