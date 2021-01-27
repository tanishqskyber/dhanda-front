export class Config{
    baseUrl:string

    constructor(){
      // this.baseUrl = "http://14b58a15104e.ngrok.io/"  //development
    //this.baseUrl = "http://13.127.199.188:4001/"  //production
       // this.baseUrl = "http://3.7.70.161:4001/"  //tes

        this.baseUrl="https://back.mydhanda.com:4001/"
    }

    getBaseURL(){
        return this.baseUrl
    }

    
 
}