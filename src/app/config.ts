export class Config{
    baseUrl:string

    constructor(){
        // this.baseUrl = "http://fc7e9d8d2bcd.ngrok.io/"  //development
        //this.baseUrl = "http://13.127.199.188:4001/"  //production
        this.baseUrl = "http://3.7.70.161:4001/"  //tes
    }

    getBaseURL(){
        return this.baseUrl
    }

    
 
}