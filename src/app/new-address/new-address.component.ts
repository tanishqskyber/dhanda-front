import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {
  stateData:any=[]
  cityData:any=[]
  state_id:any=null;
  city_id:any=null;
  state_name:any=null;
  city_name:any=null;
  flat_no:any=null;
  building_no:any=null;
  road_no:any=null;
  pincode:any=null;
  delivery_contact_no:any=null
  params:string;
  updateAddress:boolean=false;
  constructor(private catservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.queryParams["id"];
    this.loadStates()
  }

  saveAddress(){
    this.spinner.show()



     for(var sdata of this.stateData){
       if(sdata['id']==this.state_id){
         this.state_name=sdata['name']
       }
     }
   
     for(var cdata of this.cityData){
       if(cdata['id']==this.city_id){
         this.city_name=cdata['name']
       }
     }
     if(this.flat_no!=null && this.building_no!=null && this.state_name!=null && this.city_name!=null && this.pincode!=null && this.delivery_contact_no!=null){
       var params={
         "flat_no":this.flat_no,
         "apartment_name":this.building_no,
         "road_name":this.road_no,
         "state":this.state_name,
         "city":this.city_name,
         "pincode":this.pincode,
         "is_default_address":true,
         "contact_no":this.delivery_contact_no
       }
       this.catservice.saveCustomerAddress(params).then(resp=>{
         console.log(resp)
         if(resp['message']=='Customer new address added successfully!'){
          this.router.navigate(['/address']);
         }else{
           this.spinner.hide()
           this.toastr.error('Something went wront while saving address!','Error',{
             timeOut:3000,
             positionClass:'toast-top-center'
             })
         }
        
       },error=>{
         this.spinner.hide()
         console.log(error)
         this.toastr.error('Failed to save address!','Error',{
           timeOut:3000,
           positionClass:'toast-top-center'
           })
       })
     }else{
       this.spinner.hide()
       this.toastr.error('Please fill all the details to save the address!','Error',{
         timeOut:3000,
         positionClass:'toast-top-center'
         })
     }

   
    }

    private loadStates(){
      this.spinner.show()
      this.catservice.getStates().then(resp=>{
        console.log(resp)
        if(resp['message']=='States list!'){
          this.spinner.hide()
          this.stateData=resp['data']
          if(this.params!=undefined || this.params!=null){
            this.spinner.show();
            this.updateAddress=true
            this.catservice.getAddressbyId(this.params).then(resp=>{
              console.log(resp)
              this.flat_no=resp['data']['flat_no']
              this.building_no=resp['data']['apartment_name']
              this.road_no=resp['data']['road_no']
              this.pincode=resp['data']['pincode']
              this.delivery_contact_no=resp['data']['contact_no']
              this.flat_no=resp['data']['flat_no']
             

              
              this.spinner.hide();
            },error=>{
              console.log(error)
              this.spinner.hide();
            })
          }else{
            this.spinner.hide()
            this.updateAddress=false;
          }
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

   

}
