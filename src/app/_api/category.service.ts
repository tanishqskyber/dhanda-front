import {HttpClient,HttpHeaders  } from '@angular/common/http'
import { Injectable,EventEmitter,Output } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import {Config} from '../config'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const path = new Config().getBaseURL();
@Injectable({
    providedIn: 'root'
  })
  export class CategoryService{
    @Output() isLoggedIn: EventEmitter<string> = new EventEmitter();
    constructor(private http: HttpClient,private router: Router,private toastr: ToastrService){}

    getcategories(): Promise<any> {  
        let promise = new Promise((resolve, reject) => {
            this.http.get(`${path}category/category_list`)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }

      getSubcategories(id:any): Promise<any> {  
          var params={
            "category_id":id
          }
        let promise = new Promise((resolve, reject) => {
            this.http.post(`${path}sub-category/subcategory_list_by_category`,params)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }


      getProductList(id:any): Promise<any> {  
        var params={
          "sub_category_id":id
        }
      let promise = new Promise((resolve, reject) => {
          this.http.post(`${path}product/product_list`,params)
              .subscribe(
                  res => {
                      
                      resolve(res);
                  },
                  err => {
                      console.log("Error occured : " + err);
                      reject(err);
                  }
              );
    
      });
    
      return promise;
    }


    getProductDetails(id:any): Promise<any> {  
        var params={
          "id":id
        }
      let promise = new Promise((resolve, reject) => {
          this.http.post(`${path}product/product_details`,params)
              .subscribe(
                  res => {
                      
                      resolve(res);
                  },
                  err => {
                      console.log("Error occured : " + err);
                      reject(err);
                  }
              );
    
      });
    
      return promise;
    }

    addcart(params:any): Promise<any> {  
       
      let promise = new Promise((resolve, reject) => {
          this.http.post(`${path}cart/add`,params)
              .subscribe(
                  res => {
                      
                      resolve(res);
                  },
                  err => {
                      console.log("Error occured : " + err);
                      reject(err);
                  }
              );
    
      });
    
      return promise;
    }

    getCartList(): Promise<any> {  
       
        let promise = new Promise((resolve, reject) => {
            this.http.get(`${path}cart/details`)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }

      updateCartQuantity(id,qty): Promise<any> {  
       var params={
        "id":id, 
        "qty":qty
       }
        let promise = new Promise((resolve, reject) => {
            this.http.post(`${path}cart/update`,params)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }

      removeCartItem(id): Promise<any> {  
        var params={
         "id":id, 
        }
         let promise = new Promise((resolve, reject) => {
             this.http.post(`${path}cart/remove`,params)
                 .subscribe(
                     res => {
                         
                         resolve(res);
                     },
                     err => {
                         console.log("Error occured : " + err);
                         reject(err);
                     }
                 );
       
         });
       
         return promise;
       }


       getCouponDetails(coupon_code): Promise<any> {  
        var params={
         "coupon_code":coupon_code, 
        }
         let promise = new Promise((resolve, reject) => {
             this.http.post(`${path}coupon/coupon_details`,params)
                 .subscribe(
                     res => {
                         
                         resolve(res);
                     },
                     err => {
                         console.log("Error occured : " + err);
                         reject(err);
                     }
                 );
       
         });
       
         return promise;
       }


       getStoreDetails(): Promise<any> {  
         let promise = new Promise((resolve, reject) => {
             this.http.get(`${path}store/customer_store_location_details`)
                 .subscribe(
                     res => {
                         
                         resolve(res);
                     },
                     err => {
                         console.log("Error occured : " + err);
                         reject(err);
                     }
                 );
       
         });
       
         return promise;
       }

       updateCustomerDetails(params:any): Promise<any> {  
        let promise = new Promise((resolve, reject) => {
            this.http.post(`${path}user/update_profile`,params)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }

      getCustomerDetails(): Promise<any> {  
        let promise = new Promise((resolve, reject) => {
            this.http.get(`${path}user/customer_details`)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }


      saveCustomerAddress(params:any): Promise<any> {  
        let promise = new Promise((resolve, reject) => {
            this.http.post(`${path}user/add_new_address`,params)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }

      getStates(): Promise<any> {  
        let promise = new Promise((resolve, reject) => {
            this.http.get(`${path}location/state_list`)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }

      getCities(id:any): Promise<any> {  
        let promise = new Promise((resolve, reject) => {
            this.http.get(`${path}location/${id}/cities_by_state`)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }

      logoutCustomer(): Promise<any> {  
          var params={}
        let promise = new Promise((resolve, reject) => {
            this.http.post(`${path}user/customer_logout`,params)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }

      saveOrder(params): Promise<any> {  
       
      let promise = new Promise((resolve, reject) => {
          this.http.post(`${path}order/add_order`,params)
              .subscribe(
                  res => {
                      
                      resolve(res);
                  },
                  err => {
                      console.log("Error occured : " + err);
                      reject(err);
                  }
              );
    
      });
    
      return promise;
    }

    getOrders(): Promise<any> {  
        let promise = new Promise((resolve, reject) => {
            this.http.get(`${path}order/order_list`)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }

      getOrderbyId(id:any): Promise<any> { 
          var params={
              "id":id
          }
        let promise = new Promise((resolve, reject) => {
            this.http.post(`${path}order/order_details`,params)
                .subscribe(
                    res => {
                        
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
      
        });
      
        return promise;
      }
  }