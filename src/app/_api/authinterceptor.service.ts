import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor } from '@angular/common/http'
import {AuthService} from './auth.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private injector: Injector){}

    intercept(req,next){
        
        var url=req.url; 
        var auth = this.injector.get(AuthService)
       // console.log(url.indexOf("login"));
        if(url.indexOf("login")==-1 || url.indexOf("customer_signup_signin")==-1){
            
            var authRequest = req.clone({
                
                headers: req.headers.set('Authorization','Bearer ' + auth.token)
            })
            return next.handle(authRequest)
        }else{
            return next.handle(req.clone())
        }
        
        
    }
}