import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';
import { error } from 'protractor';
import {SupportService} from './../_api/support.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customerData:any={}
  stateData:any=[]
  cityData:any=[]
  editTrue:boolean=true;
  constructor(private catservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute,private support:SupportService) { }

  ngOnInit(): void {

    this.loadCustDetailsbyMob()
    this.loadStates()
  }

  private loadCustDetailsbyMob(){
    this.spinner.show()
    this.support.getCustDetailsbyContact(localStorage.getItem('contact-no')).then(resp=>{
      if(resp['message']=='Customer details!'){
        var params={
          customer_name:resp['data']['profile_name'],
          email:resp['data']['email'],
          flat_no:resp['data']['flat_no'],
          apartment_name:resp['data']['apartment_name'],
          road_name:resp['data']['road_name'],
          pincode:resp['data']['pincode'],
          state_id:resp['data']['state_id'],
          city_id:resp['data']['city_id']
        }
          this.catservice.updateCustomerDetails(params).then(res=>{
            if(res['message']=='User info!'){
              
              this.loadCustomerDetails()
            }else{
              this.loadCustomerDetails()
            }
          },error=>{
            this.loadCustomerDetails()
          })
      }else if(resp['message']=='Customer details not available'){
        this.loadCustomerDetails()
      }
    })
  }

  private loadCustomerDetails(){
    this.spinner.show()
    this.catservice.getCustomerDetails().then(resp=>{
      if(resp['message']=='User info!'){
        this.spinner.hide()
        this.customerData=resp['data']
        if(this.customerData['state_id']!=null){
          this.loadCities(this.customerData['state_id'])
        }
        console.log(this.customerData)
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
      this.toastr.error('Failed to load User Data!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })

  }

  logout(){
    this.spinner.show()
    this.catservice.logoutCustomer().then(resp=>{
      console.log(resp)
      if(resp['message']=='Logout successfully!'){
        this.spinner.hide()
      localStorage.removeItem('token')
      localStorage.removeItem('contact-no')
      localStorage.removeItem('subCategory')
      localStorage.removeItem('storeId')
      this.router.navigate([ '/in',localStorage.getItem('username')]);
      }else{
        this.spinner.hide()
        localStorage.removeItem('token')
        localStorage.removeItem('contact-no')
        localStorage.removeItem('subCategory')
        localStorage.removeItem('storeId')
      this.router.navigate([ '/in',localStorage.getItem('username')]);
      }
   
    },error=>{
      this.spinner.hide()
      localStorage.removeItem('token')
      localStorage.removeItem('contact-no')
      localStorage.removeItem('subCategory')
      localStorage.removeItem('storeId')
      this.router.navigate([ '/in',localStorage.getItem('username')]);
      console.log(error)
    })
  }

  private loadStates(){
    this.spinner.show()
    this.catservice.getStates().then(resp=>{
      console.log(resp)
      if(resp['message']=='States list!'){
        this.spinner.hide()
        this.stateData=resp['data']
      }else{
        this.spinner.hide()
        this.toastr.error('Something Went Wrong states!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    },error=>{
      console.log(error)
      this.spinner.hide()
      this.toastr.error('Failed to load State List!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }

   loadCities(id:any){
     this.spinner.show()
    this.catservice.getCities(id).then(resp=>{
      if(resp['message']=='Cities list!'){
        
        this.spinner.hide()
        this.cityData=resp['data']
      }else{
        this.spinner.hide()
        this.toastr.error('Something Went Wrong in cities!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    },error=>{
      console.log(error)
      this.spinner.hide()
        this.toastr.error('Failed to load Cities list!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      
    })
  }

  editProfile(){
    this.editTrue=false;
  }

  updateProfile(){
    this.spinner.show()
    this.catservice.updateCustomerDetails(this.customerData).then(resp=>{
      console.log(resp)
      if(resp['message']=='User info!'){
        this.spinner.hide()
         this.editTrue=true;
         this.loadCustomerDetails()
      }else if(resp['message']=='No user found!'){
        this.editTrue=true;
        this.spinner.hide()
        this.loadCustomerDetails()
        this.toastr.error('No user found!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        this.spinner.hide()
        this.editTrue=true;
        this.loadCustomerDetails()
        this.toastr.error('Something went wrong!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
     
     
    },error=>{
      this.spinner.hide()
      this.editTrue=true;
      this.loadCustomerDetails()
      console.log(error)
      this.toastr.error('Failed to Update!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
    
   
  }

  gotoAddress(){
    this.router.navigate([ '/address']);
  }

}
