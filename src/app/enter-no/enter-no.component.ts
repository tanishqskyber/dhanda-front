import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_api/auth.service'
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-enter-no',
  templateUrl: './enter-no.component.html',
  styleUrls: ['./enter-no.component.css']
})
export class EnterNoComponent implements OnInit {
  params:any;
  stroreid:any;
  contact_no:any;
  constructor(private auth: AuthService,private route: ActivatedRoute, private router: Router,private toastr: ToastrService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   
    this.params = this.route.snapshot.queryParams["username"];
    localStorage.setItem('username',this.params)
    console.log(this.params)
    this.loadStoreId()

  }

  private loadStoreId(){
    this.spinner.show()
    this.auth.getStoreId(this.params).then(resp=>{
      console.log(resp)
      if(resp['message']=='Vendor!'){
        this.spinner.hide()
        this.stroreid=resp['data']['id']
        console.log(this.stroreid)
      }else if(resp['message']=='Vendor not found!'){
        this.spinner.hide()
        this.toastr.error('Store not found!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        this.spinner.hide()
        this.toastr.error('Something Went Wrong!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
     
      
    },error=>{
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to load store details!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }

  login(){
    this.spinner.show()
    if(this.contact_no!=undefined || this.contact_no!=null){
      if(this.contact_no.length==10){
      this.auth.userLogin(this.contact_no,this.stroreid).then(resp=>{
        if(resp['message']=='Signin successfully & OTP sent!' && resp['status']==202){
          this.spinner.hide()
          console.log
          this.auth.saveToken(resp['data']['secure_set'])
          localStorage.setItem('contact-no',this.contact_no)
          this.toastr.success('Sign-in successfully & OTP sent!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
          this.router.navigate(['/otp']);
        }else if(resp['message']=='Signup successfully & OTP sent!' && resp['status']==202){
          this.spinner.hide()
          console.log
          this.auth.saveToken(resp['data']['secure_set'])
          localStorage.setItem('contact-no',this.contact_no)
          this.toastr.success('Sign-up successfully & OTP sent!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
          this.router.navigate(['/otp']);
        }else if(resp['message']=='User not exist!!' && resp['status']==404){
          this.spinner.hide()
          this.auth.saveToken(resp['secure_set'])
          this.toastr.error('User not exist!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
          this.router.navigate(['/otp']);
        }else{
          this.spinner.hide()
          this.toastr.error('Something Went Wrong!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
       
      },error=>{
        this.spinner.hide()
        console.log(error)
        this.toastr.error('Failed to Login!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      })
    }else{
      this.spinner.hide()
      this.toastr.error('Please enter 10-digit mobile number!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
    }else{
      this.spinner.hide()
      this.toastr.error('Please Enter Contact Details!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    } 
  }

}
