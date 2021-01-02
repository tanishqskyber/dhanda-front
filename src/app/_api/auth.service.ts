import {HttpClient,HttpHeaders  } from '@angular/common/http'
import { Injectable,EventEmitter,Output } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import {Config} from '../config'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const path = new Config().getBaseURL();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() isLoggedIn: EventEmitter<string> = new EventEmitter();
  TOKEN_KEY = 'token'
  id:any;
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }
  get token(){
    //console.log("Get Token Called");
    return localStorage.getItem(this.TOKEN_KEY)
}

get isAuthenticated(){
    return !!localStorage.getItem(this.TOKEN_KEY)
}

getIsLoggedIn(){
    if(localStorage.getItem('data')){
        console.log("User is logged in")
        return true;
    }else{
        return false;
    }
}

getStoreId(username:any): Promise<any> {  
    let promise = new Promise((resolve, reject) => {
        this.http.get(`${path}user/get_vendor?user_name=${username}`)
            .subscribe(
                res => {
                    
                    resolve(res);
                },
                err => {
                    console.log("Error occured : " + err);
                    reject(err);
                }
            );
  
    });
  
    return promise;
  }

  userLogin(contact_no:any,storeid:any): Promise<any> {
    var params={
        "contact_no": contact_no,
        "vendor_id": storeid
    }
    let promise = new Promise((resolve, reject) => {
        this.http.post(`${path}user/customer_signup_signin`,params)
            .subscribe(
                res => {
                    
                    resolve(res);
                },
                err => {
                    console.log("Error occured : " + err);
                    reject(err);
                }
            );
    });
    return promise;
  }


  userOtp(otp:any): Promise<any> {
    var params={
        "otp": otp,
       
    }
    let promise = new Promise((resolve, reject) => {
        this.http.post(`${path}user/customer_otp`,params)
            .subscribe(
                res => {
                    
                    resolve(res);
                },
                err => {
                    console.log("Error occured : " + err);
                    reject(err);
                }
            );
    });
    return promise;
  }

  saveToken(token){
    //console.log('Set Token')
    localStorage.setItem(this.TOKEN_KEY,token)
  }
}
