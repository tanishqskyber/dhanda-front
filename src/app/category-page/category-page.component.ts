import { Component, OnInit } from '@angular/core';
import {CategoryService} from './../_api/category.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
subcategorydata:any=[];
params:any;
  constructor(private categoryservice:CategoryService,private toastr: ToastrService,private spinner: NgxSpinnerService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.snapshot.queryParams["id"];
    localStorage.setItem('subCategory',this.params)
    this.loadSubcategory()
  }

  private loadSubcategory(){
    this.spinner.show()
    this.categoryservice.getSubcategories(this.params).then(resp=>{
      console.log(resp)
      if(resp['message']=='No subcategory found!' && resp['status']==404){
        this.spinner.hide()
        this.toastr.error('No subcategory found!','Error',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if(resp['message']=='SubCategory list!' && resp['status']==200){
        this.spinner.hide()
        this.subcategorydata=resp['data']
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

  gotoProducts(s_id:any,sub_category_name:any){
    localStorage.setItem('sub_cat_name',sub_category_name)
    this.router.navigate(['/sub-categories'],{queryParams:{id:s_id}});
  }

}
