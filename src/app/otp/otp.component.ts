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
 timerOn:boolean=true;
min:number;
sec:number;
cd1:any
showresendbutton:boolean=false
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
            var curpath=localStorage.getItem('currentpath')
            if(curpath.includes('/in/')){
              this.router.navigate([ '/in',localStorage.getItem('username')]);
            }else{
              if(curpath.includes('?')){
                console.log(curpath.split('?')[0])
                console.log(curpath.split('?')[1])
                console.log(curpath.split('?')[1].split('=')[0])
                console.log(curpath.split('?')[1].split('=')[1])
                var id=curpath.split('?')[1].split('=')[0]
                var value=curpath.split('?')[1].split('=')[1]
                this.router.navigate([`${curpath.split('?')[0]}`],{queryParams:{id:value}});
              }else{
                this.router.navigate([`${localStorage.getItem('currentpath')}`]);
              }
            }
            
            
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

  handleEvent(event){
    console.log(event)
    if(event.action=='done'){
      this.showresendbutton=true
    }else{
      this.showresendbutton=false
    }
  }

  resendOtp(){
    this.spinner.show()
    this.auth.resenduserOtp(this.mobilenumber).then(resp=>{
    
      if(resp['message']=='OTP send successfully!'){
        this.spinner.hide()
        this.toastr.success('Otp has been re-send!','Msg',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        this.toastr.error('Unable to send otp again!','Msg',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
     
    },error=>{
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to send OTP!','Msg',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
   
     
  }








}
