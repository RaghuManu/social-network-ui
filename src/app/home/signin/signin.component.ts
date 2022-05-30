import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SharedService} from '../../shared.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private _http:HttpClient,
            private   _router:Router,
            private  _shared:SharedService) {

              this._shared.signInEmail ='';
              this._shared.isSignIn=false;
              
              this._shared.clearAuthUser();
             }

  ngOnInit(): void {
  }

  passwordError:String='';
  signIn(form:NgForm){

  console.log(form.value['email'])

  //
  let req_obj = {
    email:form.value['email'],
    password: form.value['password']
  } 

  this._http.post('http://localhost:3000/api/auth/signin',req_obj)
  .subscribe((res)=>{
    
    if(res['status'] == 404){
      this.passwordError = res['message'];
    }
    if(res['status'] == 200){
      this.passwordError ='';
      this._shared.isSignIn = true;
      this._shared.signInEmail = res['email'];
      this._shared.setAuthUser(res['email']);
      this._router.navigate(['home'])
    }
  })

  }

}
