import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../../shared.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private _http:HttpClient,private _shared:SharedService, private _router:Router) { }

  ngOnInit(): void {
  }

  postError:String;
  post_image;
  submitPost(form:NgForm){
  
    //request payload
    
    let loc_name= form.value['locName'];
    let loc_desc = form.value['locDesc'];
    let loc_image  =  this.post_image;
    let email = this._shared.signInEmail;
   
  
    
    //request obj
  /* console.log(formData)
    loc_image = formData; */
    let obj = {
      loc_name:loc_name,
      loc_desc: loc_desc,
      email:email
    }
  
  
    //request payload in formdata not object

    let formData = new FormData();

    formData.append('loc_image',loc_image);
    formData.append('loc_name',loc_name);
    formData.append('loc_desc',loc_desc);
    formData.append('email',email.toString());

    this._http.post('http://localhost:3000/api/post/addpost',formData)
    .subscribe((res)=>{
          if(res['status']==200){
            this.postError = null;
              this._router.navigate(['home']);
          }else{
            this.postError = res['data']['message']
          }
    })

    
    

  }


  updateImage(event){
  
 
     this.post_image  = event.target.files[0];
   
 
   }
}
