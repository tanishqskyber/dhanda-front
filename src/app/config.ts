export class Config{
    baseUrl:string

    constructor(){
       //this.baseUrl = "http://988722fcdf36.ngrok.io/"  //development
        this.baseUrl = "http://13.127.199.188:4001/"  //production
        //  this.baseUrl = "http://3.7.70.161:4001/"  //tes
    }

    getBaseURL(){
        return this.baseUrl
    }

    
 
}