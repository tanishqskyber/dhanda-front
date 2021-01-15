import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-sub-category',
  templateUrl: './empty-sub-category.component.html',
  styleUrls: ['./empty-sub-category.component.css']
})
export class EmptySubCategoryComponent implements OnInit {

  username:any;
  constructor() { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')
  }

}
