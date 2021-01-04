import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from '../../custom-modal/custom-modal.component';
import { AppComponent } from '../../app.component';
import {CategoryService} from '../../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-searched-product',
  templateUrl: './searched-product.component.html',
  styleUrls: ['./searched-product.component.css']
})
export class SearchedProductComponent implements OnInit {
  @ViewChild('myModal') myModal;
  private modalRef;
  counter : any = 0;
  isBtn = false;
  isModalShow = false;
  productData:any=[];
  params:any;
  subcategory_name:any;
  search:any;
  category_id:any;
  variation_ids_arr:any=[]
  varia_split_arr:any=[]
  variation_ids:any;
  productInfo:any={}
  variationData:any={}
  variationKeys:any=[]
  product_id:any;
  constructor(private modalService: NgbModal, config: NgbModalConfig,private comp: AppComponent,private categoryservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { 
    config.backdrop = true;
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.loadProductdata()
  }


  private loadProductdata(){
    this.productData=JSON.parse(localStorage.getItem('searchedProduct'))
  }

  gotoProductDetails(p_id:any){
    this.router.navigate(['/product-details'],{queryParams:{id:p_id}});
  }


  loadProductInfo(id){
    this.spinner.show()
    this.product_id=id
   
    this.categoryservice.getProductDetails(id).then(resp=>{
      console.log(resp)
      if(resp['message']=='No product found!' && resp['status']==404){
        this.spinner.hide()
        this.toastr.error('No subcategory found!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if(resp['message']=='Product info!' && resp['status']==200){
        this.spinner.hide()
        this.productInfo=resp['data']
        if(this.productInfo['variations'].length>0){
        var groupBy = function(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, []);
        };
      
        this.variationData=groupBy(this.productInfo['variations'], 'variation_name')
        console.log(this.variationData);
        console.log(Object.keys(this.variationData))
        this.variationKeys=Object.keys(this.variationData)
        this.isModalShow = true;
      }else{
        this.variationData={}
        this.toastr.error('Product Out of Stock!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
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


  addproducttoCart(){
    if(this.varia_split_arr.length==2){
    if(this.counter>0){
      var obj={
        "product_id":this.product_id,
        "price":this.productInfo['selling_price'],
        "qty":this.counter,
        "variation_id":this.variation_ids
      }
      this.categoryservice.addcart(obj).then(resp=>{
        console.log(resp)
        if(resp['message']=='Product added to the cart successfully!' && resp['status']==200){
          this.isModalShow = false;
          this.comp.checkCart();
          this.toastr.success('Product has been added to the cart!','Success',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }else if(resp['message']=='Product in the cart has been updated!' && resp['status']==200){
          this.isModalShow = false;
          this.comp.checkCart();
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

  backDrop(){
    this.isModalShow = false;
    this.productInfo={}
    this.variationData=[]
    this.variationKeys=[]
  }
  decrement() {
    if(this.counter > 0){
      this.counter--;
    }
    if(this.counter === 0){
      this.isBtn = false;
    } else{
      this.isBtn = true;
    }
  }

  increment() {
    this.counter++;
    this.isBtn = true;
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

  decrementproduct() {
    if(this.counter > 0){
      this.counter--;
    }
    if(this.counter === 0){
      this.isBtn = false;
    } else{
      this.isBtn = true;
    }
    localStorage.setItem('cart',this.counter);
    this.comp.checkCart();
  }

  incrementproduct() {
    this.counter++;
    this.isBtn = true;
    localStorage.setItem('cart',this.counter);
    this.comp.checkCart();
  }

  incrementOne() {
    this.counter++;
    localStorage.setItem('cart',this.counter);
    this.isModalShow = false; 
    this.comp.checkCart();
  }

}
