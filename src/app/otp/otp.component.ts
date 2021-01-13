import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_api/auth.service'
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px',
      'outline':'none'
    }
  };

  otpstring:any;
 mobilenumber:any;


  constructor(private auth: AuthService,private route: ActivatedRoute, private router: Router,private toastr: ToastrService,private spinner: NgxSpinnerService) { }

  
  ngOnInit(): void {
 this.mobilenumber=localStorage.getItem('contact-no')
    
  }
  
  onOtpChange(otp){
    console.log(otp);
    this.otpstring=otp
  }

  postOtp(){
    this.spinner.show()
    if(this.otpstring!=undefined || this.otpstring!=null){
      if(this.otpstring.length==4){
        this.auth.userOtp(this.otpstring).then(resp=>{
          if(resp['status']==200 && resp['message']=='Success!'){
            this.spinner.hide()
            console.log(resp)
            this.auth.saveToken(resp['data'])
            this.router.navigate(['/home']);
          }else if(resp['status']==400 && resp['message']=='Invalid Otp!'){
            this.spinner.hide()
            this.toastr.error('Invalid OTP!','Error',{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          }else if(resp['message']=='Invalid user!' && resp['status']==401){
            this.spinner.hide()
            this.toastr.error('Invalid User!','Error',{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          }else{
            this.spinner.hide()
            this.toastr.error('Something went wrong!','Error',{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          }
         
        },error=>{
          this.spinner.hide()
          console.log(error)
          this.toastr.error('Failed to validated!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        })
      }else{
        this.spinner.hide()
        this.toastr.error('Please Enter 4-digit OTP!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    }else{
      this.spinner.hide()
      this.toastr.error('Please Enter OTP!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  }

}
