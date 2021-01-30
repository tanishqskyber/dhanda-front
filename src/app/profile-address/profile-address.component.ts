import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';
import {SupportService} from './../_api/support.service'
@Component({
  selector: 'app-profile-address',
  templateUrl: './profile-address.component.html',
  styleUrls: ['./profile-address.component.css']
})
export class ProfileAddressComponent implements OnInit {
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
  full_name:any=null;
  params:string;
  updateAddress:boolean=false;
  getCityName:any;
  customerData:any={}
  constructor(private catservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute,private support:SupportService) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.queryParams["id"];

   // this.loadCustDetailsbyMob()
   this.loadCustomerDetails()
    this.loadStates()
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
    
           for(var data of this.cityData){
             if(data['name']==this.getCityName){
               this.city_id=data['id']
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
          this.catservice.updateCustomerDetails(params).then(res=>{
            if(res['message']=='User info!'){
              
              if(localStorage.getItem('addCartData')!=null){
                this.catservice.addcart(JSON.parse(localStorage.getItem('addCartData'))).then(resp => {
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
        console.log("Semthing went wrong Cutomer Details")
      }
    },error=>{
      console.log("Failed to get Cutomer Details")
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

  updateProfile(){
    this.spinner.show()
    var curpath=localStorage.getItem('currentpath')
    this.catservice.updateCustomerDetails(this.customerData).then(resp=>{
      console.log(resp)
      if(resp['message']=='User info!'){
        this.customerAddressSave(this.customerData)
        if(localStorage.getItem('addCartData')!=null){
          this.catservice.addcart(JSON.parse(localStorage.getItem('addCartData'))).then(resp => {
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
       
         
      }else if(resp['message']=='No user found!'){
      
        this.spinner.hide()
      
        this.toastr.error('No user found!','Error',{
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
      this.toastr.error('Failed to Update!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
    
   
  }

  private customerAddressSave(address_params:any){
    for(var sdata of this.stateData){
      if(sdata['id']==address_params['state_id']){
        this.state_name=sdata['name']
      }
    }
  
    for(var cdata of this.cityData){
      if(cdata['id']==address_params['city_id']){
        this.city_name=cdata['name']
      }
    }
    var params={
      "full_name":address_params['profile_name'],
      "flat_no":address_params['flat_no'],
      "apartment_name":address_params['apartment_name'],
      "road_name":address_params['road_name'],
      "state":this.state_name,
      "city":this.city_name,
      "pincode":address_params['pincode'],
      "is_default_address":true,
      "contact_no":localStorage.getItem('contact-no')
    }
    this.catservice.saveCustomerAddress(params).then(resp=>{
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
