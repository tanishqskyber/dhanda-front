import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CounterInputComponent implements OnInit {


  @Input() counter = 1;
  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.counter++;
  }

  remove() {
    if(this.counter != 0){
    this.counter--;
  }
  }

}
