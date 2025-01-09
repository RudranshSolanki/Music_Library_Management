
export class ApplicationError extends Error {
    constructor(statusCode,errMessage) {
      super(errMessage);
      this.statusCode = statusCode;
    }
  }
export class ValidateError extends Error{
    constructor(statusCode,errMessage){
        super(errMessage);
        this.statusCode = statusCode
    }
}
  
export const errorHandlerMiddleware = (err, req, res,next) => {
    console.log(err);
    if(err instanceof ApplicationError)
        res.status(err.statusCode).send({status:err.statusCode,data:null,message:err.message,error:null});
    else if(err instanceof ValidateError){
        res.status(400).send({status:400,data:null,message:`Bad Request, Reason: ${ err.message}`,error:null});
    }
    else if(err.name == "ValidationError"){
        const message = Object.values(err.errors).map((error) => error.message);
        res.status(400).send({status:400,data:null,message:`Bad Request, Reason: ${ message}`,error:null});
    }
    else{
        res.status(400).send('Bad Request');
    }
};