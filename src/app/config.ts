export class Config{
    baseUrl:string

    constructor(){
<<<<<<< HEAD
       //this.baseUrl = "http://988722fcdf36.ngrok.io/"  //development
        // this.baseUrl = "http://13.127.199.188:4001/"  //production
         this.baseUrl = "http://3.7.70.161:4001/"  //tes
=======
       this.baseUrl = "http://99baf6b6e37a.ngrok.io/"  //development
        //this.baseUrl = "http://13.127.199.188:4001/"  //production
       //  this.baseUrl = "http://3.7.70.161:4001/"  //tes
>>>>>>> 95235696803ab9a5d90e536cfae013c3c318be51
    }

    getBaseURL(){
        return this.baseUrl
    }

    
 
}