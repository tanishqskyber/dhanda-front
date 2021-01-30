import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router} from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categorydata:any=[]
  search:any;
  searchedProducts:any=[]
  constructor(private categoryservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('currentpath',this.router.url)
    this.loadCategories()
  }
  private loadCategories(){
    this.spinner.show()
    this.categoryservice.getcategories(localStorage.getItem('storeId')).then(resp=>{
      if(resp['status']==200 && resp['message']=='Category list!'){
        this.spinner.hide()
        this.categorydata=resp['data']
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

  gotoSubcategory(catid){
    this.router.navigate(['/category-page'],{queryParams:{id:catid}});
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
