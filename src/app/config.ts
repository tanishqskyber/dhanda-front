export class Config{
    baseUrl:string

    constructor(){
        //this.baseUrl = "http://11fad1eeb9b1.ngrok.io/"  //ngrok
        this.baseUrl = "http://13.127.199.188:4001/"  //test
        // this.baseUrl = "http://95df687cb379.ngrok.io/"  //production
    }

    getBaseURL(){
        return this.baseUrl
    }

    
 
}