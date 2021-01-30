import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_api/auth.service'
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {CategoryService} from '../_api/category.service'
import {SupportService} from './../_api/support.service'
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
stateData:any=[]
cityData:any=[]
  constructor(private auth: AuthService,private route: ActivatedRoute, private router: Router,private toastr: ToastrService,private spinner: NgxSpinnerService,private categoryservice: CategoryService,private support:SupportService) { }

  
  ngOnInit(): void {

 this.mobilenumber=localStorage.getItem('contact-no')
this.loadStates()

    
  }
  
  onOtpChange(otp){
    console.log(otp);
    this.otpstring=otp
  }

  private loadStates(){
    this.spinner.show()
    this.categoryservice.getStates().then(resp=>{
      console.log(resp)
      if(resp['message']=='States list!'){
       
        this.stateData=resp['data']
        this.spinner.hide()
      }else{
        this.spinner.hide()
   
      }
    },error=>{
      console.log(error)
      this.spinner.hide()
     
    })
  }

  async loadCities(id:any,city_id:any){
    this.spinner.show()
   this.categoryservice.getCities(id).then(resp=>{
     if(resp['message']=='Cities list!'){
       
       this.spinner.hide()
       this.cityData=resp['data']
       console.log(this.cityData.filter(city=>(city['id']==city_id))[0]['name'])
       return this.cityData.filter(city=>(city['id']==city_id))[0]['name']
   
     }else{
       this.spinner.hide()
       return null
    
     }
   },error=>{
     console.log(error)
     this.spinner.hide()
     return null
     
   })
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

            this.loadCustDetailsbyMob()
            //console.log(localStorage.getItem('addCartData'))
     
          
            
            
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

  private loadCustDetailsbyMob(){
    this.spinner.show()
    var curpath=localStorage.getItem('currentpath')
    this.support.getCustDetailsbyContact(localStorage.getItem('contact-no')).then(resp=>{
      if(resp['message']=='Customer details!'){
        console.log(resp)
    
           var params={
          profile_name:resp['data']['profile_name'],
          email:resp['data']['email'],
          flat_no:resp['data']['flat_no'],
          apartment_name:resp['data']['apartment_name'],
          road_name:resp['data']['road_name'],
          pincode:resp['data']['pincode'],
          state_id:resp['data']['state_id'],
          city_id:resp['data']['city_id']
        }
        console.log(params)
          this.categoryservice.updateCustomerDetails(params).then(res=>{
            if(res['message']=='User info!'){
                this.customerAddressSave(params);
              if(localStorage.getItem('addCartData')!=null){
                this.categoryservice.addcart(JSON.parse(localStorage.getItem('addCartData'))).then(resp => {
                  console.log(resp)
                  if (resp['message'] == 'Product added to the cart successfully!' && resp['status'] == 200) {
                      console.log('Product added to Cart after login')
                      localStorage.removeItem('addCartData')
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
                  } else if (resp['message'] == 'Product in the cart has been updated!' && resp['status'] == 200) {
                    console.log('Product updated to Cart after login')
                    localStorage.removeItem('addCartData')
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
                  } else {
                    console.log('Something went wrong')
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
                    console.log('Something Went Wrong!')
                  }
                }, error => {
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
                  console.log('Error in adding product to cart')
                
                })
                
              }else{
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
              }
              
            }else{
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
              console.log('went wrong in updating customer details')
            }
          },error=>{
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
            console.log('failed in updating customer details')
          })
    
       
      }else if(resp['message']=='Customer details not available'){
        this.router.navigate(['/profile-address']);
      }
    })
  }

  private customerAddressSave(address_params:any){
    
    var cityname= this.loadCities(address_params['state_id'],address_params['city_id']);
    var statename=this.stateData.filter(state=>(state['id']==address_params['state_id']))[0]['name']
    
   
    var params={
      "full_name":address_params['profile_name'],
      "flat_no":address_params['flat_no'],
      "apartment_name":address_params['apartment_name'],
      "road_name":address_params['road_name'],
      "state":statename,
      "city":cityname,
      "pincode":address_params['pincode'],
      "is_default_address":true,
      "contact_no":localStorage.getItem('contact-no')
    }
    this.categoryservice.saveCustomerAddress(params).then(resp=>{
      console.log(resp)
      if(resp['message']=='Customer new address added successfully!'){
        console.log('Customer Address Saved')
        return true;
      }else{
        console.log('Something Went Wrrong Customer Address Saved')
        return false;
      }
     
    },error=>{
      console.log('failed to Customer Address Saved')
      return false;
    })
  }











}
