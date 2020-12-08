import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '60px',
      'height': '60px',
      'outline':'none'
    }
  };
 


  constructor() { }

  
  ngOnInit(): void {
    
  }
  
  onOtpChange(otp){
    console.log(otp);
  }

}
