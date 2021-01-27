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
export class SupportService {
  @Output() isLoggedIn: EventEmitter<string> = new EventEmitter();
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }

  getDhandaSummary(): Promise<any> {  
    let promise = new Promise((resolve, reject) => {
        this.http.get(`${path}user/user_dashboard`)
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

  postEnquiry(params:any): Promise<any> {  
    let promise = new Promise((resolve, reject) => {
        this.http.post(`${path}enquiry/add`,params)
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

  getCustDetailsbyContact(mobile:any): Promise<any> {  
    var params={
        mobile_number:mobile
    }
    let promise = new Promise((resolve, reject) => {
        this.http.post(`${path}user/customer_details_by_contactno`,params)
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

}
