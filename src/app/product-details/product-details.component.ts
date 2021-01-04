import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private categoryservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { }
  counter : any = 1;
  isBtn = true;
  customOptions: any = {
    loop: true,
    margin:25,
    autoplay:true,
    responsiveClass: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],

    responsive: {
      0: {
       items: 1,
        nav:true
      }
  },
      
   nav: true
  }
  
  productData:any={};
  variationData:any={}
  variationKeys:any=[]
  params:any;
  variation_ids_arr:any=[]
  varia_split_arr:any=[]
  variation_ids:any;
  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.queryParams["id"];
    this.loadProductDetails();
  }

  private loadProductDetails(){
    this.spinner.show()
    this.categoryservice.getProductDetails(this.params).then(resp=>{
      console.log(resp)
      if(resp['message']=='No product found!' && resp['status']==404){
        this.spinner.hide()
        this.toastr.error('No subcategory found!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if(resp['message']=='Product info!' && resp['status']==200){
        this.spinner.hide()
        this.productData=resp['data']
        if(this.productData['variations'].length>0){
        var groupBy = function(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, []);
        };
        this.variationData=groupBy(this.productData['variations'], 'variation_name')
        console.log(this.variationData);
        console.log(Object.keys(this.variationData))
        this.variationKeys=Object.keys(this.variationData)
      }else{
        this.variationData={}
      }
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
      this.toastr.error('Failed to load!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }

  decrement() {
    if(this.counter > 0){
      this.counter--;
    }
    if(this.counter === 0){
      this.isBtn = true;
    } else{
      this.isBtn = false;
    }
  }

  increment() {
    this.counter++;
    this.isBtn = false;
    localStorage.setItem('cart',this.counter);
  }

  selectvariation(id,var_name){
    var obj={}
    obj["id"]=id
    obj['var_name']=var_name
    if(this.variation_ids_arr.length>0){
     if(this.variation_ids_arr.find(key => key.var_name === obj['var_name'])){
      this.removeByAttr(this.variation_ids_arr, 'var_name', obj['var_name']);
      this.variation_ids_arr.push(obj)
     }else{
      this.variation_ids_arr.push(obj)
     }
    }else{
      this.variation_ids_arr.push(obj)
    }
    this.varia_split_arr = this.variation_ids_arr.map(function(item) {
      return item['id'];
    });
    this.variation_ids=this.varia_split_arr.toString()
  }

  removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

  addproducttoCart(){
    if(this.varia_split_arr.length==2){
    if(this.counter>0){
      var obj={
        "product_id":this.params,
        "price":this.productData['selling_price'],
        "qty":this.counter,
        "variation_id":this.variation_ids
      }
      this.categoryservice.addcart(obj).then(resp=>{
        console.log(resp)
        if(resp['message']=='Product added to the cart successfully!' && resp['status']==200){
          this.router.navigate(['/add-cart']);
          this.toastr.success('Product has been added to the cart!','Success',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }else if(resp['message']=='Product in the cart has been updated!' && resp['status']==200){
          this.router.navigate(['/add-cart']);
          this.toastr.success('Product in the cart has been updated!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }else{
          this.toastr.error('Something Went Wrong!','Error',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
      },error=>{
        console.log(error)
        this.toastr.error('Failed to add to the cart!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      })
    }else{
      this.toastr.error('Please Select the Quantity!','Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  }else{
    this.toastr.error('Please Select the All the variations!','Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
    

  }



}
