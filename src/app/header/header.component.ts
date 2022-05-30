import { Component, OnInit } from '@angular/core';
import {SharedService} from './../shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSignIn =  this.shared.isSignIn;
  email:string;
  constructor(private shared:SharedService) { 

    console.log("header component constructor")

    this.shared.getAuthUser()
    .subscribe((user)=>{
      if(user){
          this.email =  user.auth;
          if(this.email){
            this.isSignIn = true;
          }
      }else{
        this.isSignIn = false;
      }
    })
  }

  ngOnInit() {
  }

}
