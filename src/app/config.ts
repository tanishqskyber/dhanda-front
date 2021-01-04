export class Config{
    baseUrl:string

    constructor(){
        //this.baseUrl = "http://3c4b1095c157.ngrok.io/"  //ngrok
        this.baseUrl = "http://13.127.199.188:4001/"  //test
        // this.baseUrl = "http://95df687cb379.ngrok.io/"  //production
    }

    getBaseURL(){
        return this.baseUrl
    }

    
 
}