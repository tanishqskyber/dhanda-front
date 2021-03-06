import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderData:any={}
  allowStorePickup:any;
  storeShow:boolean=false;
  storeActive:boolean=true;
  deliveryActive:boolean=false;
  storeTabShow:boolean=true;
  deliveryTabShow:boolean=false;
  flat_no:any=null;
  building_no:any=null;
  road_no:any=null;
  stateData:any=[]
  cityData:any=[]
  state_id:any=null;
  city_id:any=null;
  state_name:any=null;
  city_name:any=null;
  pincode:any=null;
  cash_upi_on_del:boolean=true
  delivery_date:any=null;
  converted_del_time:any=null;
  delievery_time:any=null;
  addressSave:boolean=false;
  delievery_mode:any='Pickup';
  is_address_save:boolean=false;
  delivery_contact_no:any=null
  savedAddres:any={}
  paramsid:any;
  savecityname:any;
  saveAddressOption:boolean=true;
  selectedAddress:any={}
  constructor(private catservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadStates()
    this.orderData=JSON.parse(localStorage.getItem('orderDetails'))
    this.allowStorePickup=localStorage.getItem('allowStorePickup')
    console.log(this.selectedAddress)
    this.selectedAddress=JSON.parse(localStorage.getItem('selectedAddress'))
    console.log(this.selectedAddress)
    if( this.allowStorePickup=='true'){
      this.storeShow=true
    }else{
      this.storeShow=false
      this.storeActive=false;
      this.storeTabShow=false;
      this.deliveryActive=true;
      this.deliveryTabShow=true
    }
   
    
  
  console.log(this.orderData)
  
  
  }


  loadStorePickup(){
    this.storeActive=true;
    this.storeTabShow=true;
    this.deliveryActive=false;
    this.deliveryTabShow=false
    this.delievery_mode='Pickup'
    console.log(this.delievery_mode)
  }

  loadDeliverytab(){

    this.storeActive=false;
    this.storeTabShow=false;
    this.deliveryActive=true;
    this.deliveryTabShow=true
    this.delievery_mode='Delivery'
    if(this.allowStorePickup=='true'){
      this.storeShow=true
    }else{
      this.storeShow=false;
    }
  }

  placeOrder(){
   console.log(this.delievery_mode)
    this.spinner.show()
    if(this.delievery_mode=='Pickup'){
      console.log(this.delivery_date)
      console.log(this.delievery_time)
      if((this.delivery_date!=undefined || this.delivery_date!=null) && (this.delievery_time!=undefined || this.delievery_time!=null)){
 console.log(this.orderData)
        var params={
          "delivery_date":this.delivery_date,
          "delivery_time":this.delievery_time,
          "delivery_address":null,
          "payment_method":"Cash/UPI",
          "delivery_mode":this.delievery_mode,
          "cart_id":this.orderData['cart_id'],
          "notes":this.orderData['notes'],
          "coupon_id":this.orderData['coupon_id'],
          "shipping_amount":this.orderData['shipping_amount'],
          "total_price":this.orderData['total_price'],
          "coupon_discount":this.orderData['coupon_discount'],
          "final_amount":this.orderData['final_amount'],
          "delivery_contact_no":this.delivery_contact_no,
          "is_address_save":this.is_address_save
        }
        console.log(params)
        this.catservice.saveOrder(params).then(resp=>{
          if(resp['message']=='Order added successfully!'){
            this.spinner.hide()
            localStorage.removeItem('orderDetails')
            localStorage.removeItem('allowStorePickup')
            localStorage.removeItem('selectedAddress')
             this.router.navigate(['/order-placed']);
          }else{
            this.spinner.hide()
            this.toastr.error('Something Went wrong!','Error',{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          }
        },error=>{
          this.spinner.hide()
          console.log(error)
          this.toastr.error('Failed to add order!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        })
      }else{
        this.spinner.hide()
        this.toastr.error('Please fill the required details!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    }else if (this.delievery_mode=='Delivery'){
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
      if(this.road_no!=null && this.flat_no!=null && this.building_no!=null && this.state_name!=null && this.city_name!=null && this.pincode!=null && this.delivery_contact_no!=null){
        var mainparams={
          "delivery_date":this.delivery_date,
          "delivery_time":this.delievery_time,
          "delivery_address":this.flat_no+" "+this.building_no+" "+this.road_no+" "+this.state_name+" "+this.city_name+" "+this.pincode,
          "payment_method":"Cash/UPI",
          "delivery_mode":this.delievery_mode,
          "cart_id":this.orderData['cart_id'],
          "notes":this.orderData['notes'],
          "coupon_id":this.orderData['coupon_id'],
          "shipping_amount":this.orderData['shipping_amount'],
          "total_price":this.orderData['total_price'],
          "coupon_discount":this.orderData['coupon_discount'],
          "final_amount":this.orderData['final_amount'],
          "delivery_contact_no":this.delivery_contact_no,
          "is_address_save":this.is_address_save

        }
        console.log(mainparams)
        this.catservice.saveOrder(mainparams).then(resp=>{
          if(resp['message']=='Order added successfully!'){
            this.spinner.hide()
            localStorage.removeItem('orderDetails')
            localStorage.removeItem('allowStorePickup')
            localStorage.removeItem('selectedAddress')
             this.router.navigate(['/order-placed']);
          }else{
            this.spinner.hide()
            this.toastr.error('Something Went wrong!','Error',{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          }
        },error=>{
          this.spinner.hide()
          console.log(error)
          this.toastr.error('Failed to add order!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        })
       console.log(this.orderData)
      }else{
        this.spinner.hide()
        this.toastr.error('Please fill all the details!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    }
   





  }

  private loadStates(){
    this.spinner.show()
    this.catservice.getStates().then(resp=>{
      console.log(resp)
      if(resp['message']=='States list!'){
        this.spinner.hide()
        this.stateData=resp['data']
        if(this.selectedAddress!=null){
          this.spinner.show();
          this.loadDeliverytab()
              console.log('Address Found')
              this.flat_no=this.selectedAddress['flat_no']
              this.building_no=this.selectedAddress['apartment_name']
              this.road_no=this.selectedAddress['road_name']
              this.pincode=this.selectedAddress['pincode']
              this.delivery_contact_no=this.selectedAddress['contact_no']
              this.flat_no=this.selectedAddress['flat_no']
              this.savecityname=this.selectedAddress['city']
              for(var data of this.stateData){
                if(data['name']==this.selectedAddress['state']){
                  this.state_id=data['id']
                  this.loadCities(this.state_id)
                }
              }
              this.saveAddressOption=false;
            this.spinner.hide();
        }else{
          this.saveAddressOption=true;
     
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
       if(this.selectedAddress!=null){
         for(var data of this.cityData){
           if(data['name']==this.savecityname){
             this.city_id=data['id']
             this.city_name=data['name']
           }
         }
       }
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

 saveAddress(){
 this.spinner.show()
  console.log(this.addressSave)
if(this.addressSave==true){
  this.is_address_save=true;
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
        this.spinner.hide()
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
}else{
  this.spinner.hide()
  console.log('Dont save')
}

 }

 checkTime(event){
   console.log(event)
   var H = +event.substr(0, 2);
var h = (H % 12) || 12;
var ampm = H < 12 ? "AM" : "PM";
event = h + event.substr(2, 3) + ampm;
console.log(event)
this.delievery_time=event
 }




}
