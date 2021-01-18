import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { AppComponent } from '../app.component';
// import {FooterComponent} from '../supportingcomponents/footer/footer.component'
import { CategoryService } from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import {AuthService} from '../_api/auth.service'
import {FooterComponent} from '.././supportingcomponents/footer/footer.component'
@Component({
  selector: 'app-sub-categories-popup',
  templateUrl: './sub-categories-popup.component.html',
  styleUrls: ['./sub-categories-popup.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal]
})
export class SubCategoriesPopupComponent implements OnInit {

  @ViewChild('myModal') myModal;
  private modalRef;
  counter: any = 0;
  isBtn = false;
  isModalShow = false;
  productData: any = [];
  params: any;
  subcategory_name: any;
  search: any;
  category_id: any;
  variation_ids_arr: any = []
  varia_split_arr: any = []
  variation_ids: any;
  productInfo: any = {}
  variationData: any = {}
  variationKeys: any = []
  product_id: any;
  cartId: any = [];
  cartData: any = []
  searchedProducts: any = []

  constructor(private modalService: NgbModal, config: NgbModalConfig, private comp: AppComponent, private categoryservice: CategoryService, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router, private activatedRoute: ActivatedRoute,private auth:AuthService,private foot:FooterComponent) {
    config.backdrop = true;
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.queryParams["id"];
    this.subcategory_name = localStorage.getItem('sub_cat_name')
    this.category_id = localStorage.getItem('subCategory')

    this.loadCartData()

  }

  open() {
    //this.modalService.open(CustomModalComponent);

  }
  backDrop() {
    this.isModalShow = false;
    this.productInfo = {}
    this.variationData = []
    this.variationKeys = []
  }
  decrement(p_count, id) {
    for (var data of this.productData) {
      if (data['id'] == id) {
        data['product_count'] = p_count
        if (data['product_count'] > 0) {
          data['product_count']--;
        }
        if (data['product_count'] === 0) {
          this.isBtn = false;
        } else {
          this.isBtn = true;
        }
      }


    }
    // if(this.counter > 0){
    //   this.counter--;
    // }
    // if(this.counter === 0){
    //   this.isBtn = false;
    // } else{
    //   this.isBtn = true;
    // }
  }

  increment(p_count, id) {
    for (var data of this.productData) {
      if (data['id'] == id) {
        data['product_count'] = p_count
        data['product_count']++;
        this.isBtn = true;
      }
    }

  }

  selectvariation(id, var_name) {
    var obj = {}
    obj["id"] = id
    obj['var_name'] = var_name
    if (this.variation_ids_arr.length > 0) {
      if (this.variation_ids_arr.find(key => key.var_name === obj['var_name'])) {
        this.removeByAttr(this.variation_ids_arr, 'var_name', obj['var_name']);
        this.variation_ids_arr.push(obj)
      } else {
        this.variation_ids_arr.push(obj)
      }
    } else {
      this.variation_ids_arr.push(obj)
    }
    this.varia_split_arr = this.variation_ids_arr.map(function (item) {
      return item['id'];
    });
    this.variation_ids = this.varia_split_arr.toString()
  }

  removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (arr[i]
        && arr[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arr[i][attr] === value)) {

        arr.splice(i, 1);

      }
    }
    return arr;
  }

  decrementproduct(p_count, id) {
    // console.log(p_count)
    for (var data of this.productData) {
      let obj = this.cartData.find(o => o.product_id === data['id']);
      console.log(obj)
      if (obj != undefined) {
        if (data['id'] == id) {
          data['product_count'] = p_count
          if (data['product_count'] > 0) {
            data['product_count']--;
            console.log(data['product_count'])
            if (data['product_count'] >= 1)
              this.add(obj['id'], data['product_count'])
            else if (data['product_count'] === 0) {
              this.deleteCartData(obj['id'])
            }
          }


        }
      }
    }
  }


  deleteCartData(id: any) {
    this.spinner.show()
    this.categoryservice.removeCartItem(id).then(resp => {
      console.log(resp)
      if (resp['message'] == 'Item remove from cart successfully!') {
        this.loadCartData()
        // this.foot.loadCartDetails()
        this.spinner.hide()
      } else if (resp['message'] == 'Something went wrong') {
        this.spinner.hide()
        this.toastr.error('Something went wrong', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }
    }, error => {
      console.log(error)
      this.spinner.hide()
      this.toastr.error('Failed to remove cart item!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })
  }

  incrementproduct(p_count, id) {
    for (var data of this.productData) {
      let obj = this.cartData.find(o => o.product_id === data['id']);
      if (obj != undefined) {
        if (data['id'] == id) {
          data['product_count'] = p_count
          data['product_count']++;
          this.add(obj['id'], data['product_count'])
        }
      }

    }

    this.isBtn = true;

  }

  add(id, qty) {
    this.spinner.show()
    this.categoryservice.updateCartQuantity(id, qty).then(resp => {

      if (resp['message'] == 'Cart updated successfully!' && resp['status'] == 200) {
        this.loadCartData()
        // this.foot.loadCartDetails()
      } else {
        this.spinner.hide()
        this.toastr.error('Something went wrong!!!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }

    }, error => {
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to update quantity!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })



  }

  incrementOne() {
    this.counter++;

    this.isModalShow = false;

  }

  addToCart() {
    this.isModalShow = false;

  }


  private loadProductdata() {
    this.spinner.show()
    this.productData = []
    this.categoryservice.getProductList(this.params).then(resp => {

      if (resp['message'] == 'No product found!' && resp['status'] == 404) {
        this.spinner.hide()
        this.toastr.error('No Product found!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
        this.router.navigate(['/empty-product']);
      } else if (resp['message'] == 'Product list!' && resp['status'] == 200) {
        this.spinner.hide()
        var pdata = resp['data']
        var obje = {}
        for (var data of pdata) {
          let obj = this.cartData.find(o => o.product_id === data['id']);
          if (obj != undefined) {
            if (Object.keys(obj).length != 0) {
              obje = {
                category_id: data['category_id'],
                category_name: data['category_name'],
                created_at: data['created_at'],
                discount: data['discount'],
                id: data['id'],
                mrp: data['mrp'],
                pieces: data['pieces'],
                product_description: data['product_description'],
                product_img_url: data['product_img_url'],
                product_img_url_2: data['product_img_url_2'],
                product_img_url_3: data['product_img_url_3'],
                product_img_url_4: data['product_img_url_4'],
                product_img_url_5: data['product_img_url_5'],
                product_name: data['product_name'],
                product_type_id: data['product_type_id'],
                product_type_name: data['product_type_name'],
                selling_price: data['selling_price'],
                status: data['status'],
                sub_category_id: data['sub_category_id'],
                subcategory_name: data['subcategory_name'],
                user_id: data['user_id'],
                user_name: data['user_name'],
                cart_added: true,
                product_count: obj['qty']
              }
            } else {
              obje = {
                category_id: data['category_id'],
                category_name: data['category_name'],
                created_at: data['created_at'],
                discount: data['discount'],
                id: data['id'],
                mrp: data['mrp'],
                pieces: data['pieces'],
                product_description: data['product_description'],
                product_img_url: data['product_img_url'],
                product_img_url_2: data['product_img_url_2'],
                product_img_url_3: data['product_img_url_3'],
                product_img_url_4: data['product_img_url_4'],
                product_img_url_5: data['product_img_url_5'],
                product_name: data['product_name'],
                product_type_id: data['product_type_id'],
                product_type_name: data['product_type_name'],
                selling_price: data['selling_price'],
                status: data['status'],
                sub_category_id: data['sub_category_id'],
                subcategory_name: data['subcategory_name'],
                user_id: data['user_id'],
                user_name: data['user_name'],
                cart_added: false,
                product_count: 0
              }
            }
          } else {
            obje = {
              category_id: data['category_id'],
              category_name: data['category_name'],
              created_at: data['created_at'],
              discount: data['discount'],
              id: data['id'],
              mrp: data['mrp'],
              pieces: data['pieces'],
              product_description: data['product_description'],
              product_img_url: data['product_img_url'],
              product_img_url_2: data['product_img_url_2'],
              product_img_url_3: data['product_img_url_3'],
              product_img_url_4: data['product_img_url_4'],
              product_img_url_5: data['product_img_url_5'],
              product_name: data['product_name'],
              product_type_id: data['product_type_id'],
              product_type_name: data['product_type_name'],
              selling_price: data['selling_price'],
              status: data['status'],
              sub_category_id: data['sub_category_id'],
              subcategory_name: data['subcategory_name'],
              user_id: data['user_id'],
              user_name: data['user_name'],
              cart_added: false,
              product_count: 0
            }
          }

          this.productData.push(obje)
        }
        console.log(this.productData)
        //this.category_id=this.productData[0]['category_id']
      } else {
        this.spinner.hide()
        this.toastr.error('Something went wrong!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }
    }, error => {
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to load!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })
  }

  gotoProductDetails(p_id: any) {
    this.router.navigate(['/product-details'], { queryParams: { id: p_id } });
  }

  searchkeyvalu(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }
    }
  }

  loadProductInfo(id) {
    this.spinner.show()
    this.product_id = id
    this.counter = 0
    this.variation_ids = null;
    this.variationKeys = []
    this.categoryservice.getProductDetails(id).then(resp => {
      console.log(resp)
      if (resp['message'] == 'No product found!' && resp['status'] == 404) {
        this.spinner.hide()
        this.toastr.error('No subcategory found!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      } else if (resp['message'] == 'Product info!' && resp['status'] == 200) {
        this.spinner.hide()
        this.productInfo = resp['data']
        if (this.productInfo['variations'].length > 0) {
          var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
              (rv[x[key]] = rv[x[key]] || []).push(x);
              return rv;
            }, []);
          };

          this.variationData = groupBy(this.productInfo['variations'], 'variation_name')
          console.log(this.variationData);
          console.log(Object.keys(this.variationData))
          this.variationKeys = Object.keys(this.variationData)
          this.isModalShow = true;
        } else {
          this.variationData = {}
          this.variationKeys = []
          this.isModalShow = true;
        }
      } else {
        this.spinner.hide()
        this.toastr.error('Something went wrong!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }
    }, error => {
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to load!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })
  }

  addproducttoCart(p_count: any) {

    this.spinner.show()
    if(this.auth.getIsLoggedIn()){
      if (this.varia_split_arr.length == 2) {
        if (p_count > 0) {
          var obj = {
            "product_id": this.product_id,
            "price": this.productInfo['selling_price'],
            "qty": p_count,
            "variation_id": this.variation_ids
          }
     
          this.categoryservice.addcart(obj).then(resp => {
            console.log(resp)
            if (resp['message'] == 'Product added to the cart successfully!' && resp['status'] == 200) {
              this.isModalShow = false;
              this.spinner.hide()
              this.loadCartData()
              this.foot.loadCartDetails()
              this.toastr.success('Product has been added to the cart!', 'Success', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              })
            } else if (resp['message'] == 'Product in the cart has been updated!' && resp['status'] == 200) {
              this.isModalShow = false;
              this.spinner.hide()
              this.loadCartData()
              // this.foot.loadCartDetails()
              this.toastr.success('Product in the cart has been updated!', 'Error', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              })
            } else {
              this.spinner.hide()
              this.toastr.error('Something Went Wrong!', 'Error', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              })
            }
          }, error => {
            this.spinner.hide()
            console.log(error)
            this.toastr.error('Failed to add to the cart!', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-center'
            })
          })
        } else {
          this.spinner.hide()
          this.toastr.error('Please Select the Quantity!', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          })
        }
      } else {
        if (p_count > 0) {
          var obje = {
            "product_id": this.product_id,
            "price": this.productInfo['selling_price'],
            "qty": p_count,
            "variation_id": ""
          }
          this.categoryservice.addcart(obje).then(resp => {
            console.log(resp)
            if (resp['message'] == 'Product added to the cart successfully!' && resp['status'] == 200) {
              this.isModalShow = false;
              this.spinner.hide()
              this.loadCartData()
              //this.foot.loadCartDetails()
              this.toastr.success('Product has been added to the cart!', 'Success', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              })
            } else if (resp['message'] == 'Product in the cart has been updated!' && resp['status'] == 200) {
              this.isModalShow = false;
              this.spinner.hide()
              this.loadCartData()
              //this.foot.loadCartDetails()
              this.toastr.success('Product in the cart has been updated!', 'Error', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              })
            } else {
              this.spinner.hide()
              this.toastr.error('Something Went Wrong!', 'Error', {
                timeOut: 3000,
                positionClass: 'toast-top-center'
              })
            }
          }, error => {
            console.log(error)
            this.spinner.hide()
            this.toastr.error('Failed to add to the cart!', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-center'
            })
          })
        } else {
          this.spinner.hide()
          this.toastr.error('Please Select the Quantity!', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          })
        }
  
  
      }
    }else{
      this.spinner.hide()
      this.toastr.warning('Please Login to Continue!', 'Alert', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
      localStorage.setItem('currentpath',this.router.url)
      this.router.navigate(['/signin-signup'])
    }
    


  }

  private loadCartData() {
    this.spinner.show()
    this.categoryservice.getCartList().then(resp => {
      console.log(resp)
      if (resp['message'] == 'Record not found!' && resp['status'] == 404) {
        this.spinner.hide()
        this.loadProductdata()
      } else if (resp['message'] == 'Cart info!' && resp['status'] == 200) {
        this.cartData = resp['data']
        this.loadProductdata()
        this.spinner.hide()
      } else {
        this.spinner.hide()
        this.loadProductdata()
        this.toastr.error('Something Went Wrong!', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }
    }, error => {
      this.spinner.hide()
      this.loadProductdata()
      console.log(error)
      this.toastr.error('Failed to get Cart Details!', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })
  }

  searhcProductbySearch() {
    this.spinner.show()
    this.categoryservice.searchProduct(this.search,localStorage.getItem('storeId')).then(resp => {
      console.log(resp)
      if (resp['message'] == 'Product info!') {
        this.searchedProducts = resp['data']
        this.spinner.hide()
        localStorage.setItem('searchedProduct', JSON.stringify(this.searchedProducts))
        this.router.navigate(['/searched-results']);
      } else {
        this.spinner.hide()
        this.toastr.error('Not able to find the product', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }
    }, error => {
      this.spinner.hide()
      console.log(error)
      this.toastr.error('Failed to find the products', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      })
    })
  }


}
