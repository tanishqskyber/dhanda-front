export class Config{
    baseUrl:string

    constructor(){
        this.baseUrl = "http://64c46b6d9f6c.ngrok.io/"  //ngrok
        // this.baseUrl = "http://95df687cb379.ngrok.io/"  //test
        // this.baseUrl = "http://95df687cb379.ngrok.io/"  //production
    }

    getBaseURL(){
        return this.baseUrl
    }

    
 
}