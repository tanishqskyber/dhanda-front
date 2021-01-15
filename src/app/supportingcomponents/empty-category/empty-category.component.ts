import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-category',
  templateUrl: './empty-category.component.html',
  styleUrls: ['./empty-category.component.css']
})
export class EmptyCategoryComponent implements OnInit {
  username:any;
  constructor() { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')
  }

}
