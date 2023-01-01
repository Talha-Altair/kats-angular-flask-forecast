import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//https://codepen.io/mamislimen/pen/jOwwLvy
export class LoginComponent implements OnInit {


  constructor(private router:Router){ 
    
  }

  signUpUsers : any[]=[];
  
  signUpObj:any={
    username:'',
    email:'',
    password: "",
    confirm_password: ""
  };
  
  
  loginObj:any={
    email:"",
    password: "",
  }; 

  title = 'salesforcastingapp';
  
  hide = true;
  required=true;
  

  ngOnInit(): void {
      const localData=localStorage.getItem('signUpUsers');
      if (localData!=null){
        this.signUpUsers=JSON.parse(localData);
      }
  }

  signup(){

    if(this.signUpObj.email != "" && this.signUpObj.password != "" && this.signUpObj.confirm_password != "" ){
      if(this.signUpObj.password == this.signUpObj.confirm_password){
      this.signUpUsers.push(this.signUpObj)
      localStorage.setItem('signUpUsers',JSON.stringify(this.signUpUsers))
      this.signUpObj={
        username:"",
        email:"",
        password: "",
        confirm_password: ""
      };
    }
    else{
      alert("password and confirm password doesn't match")
    }
  }
    // else{
    //   this.signUpObj.email.Validators.required,
    //   this.signUpObj.password.Validators.required,
    //   this.signUpObj.confirm_password.Validators.required,
    //   this.loginObj.email.Validators.required,
    //   this.loginObj.password.Validators.required
    // }
    else{
      if(this.signUpObj.email == ""){
        this.required=false;
      }
      if(this.signUpObj.password == ""){
        this.required=false;
      }
      if(this.signUpObj.confirm_password == ""){
        this.required=false;
      }
      if(this.loginObj.password == ""){
        this.required=false;
      }
      if(this.loginObj.email == ""){
        this.required=false;
      }
    }
  };

  login(){
    const isUserExist=this.signUpUsers.find(m=> m.email==this.loginObj.email && m.password==this.loginObj.password);
    if(isUserExist){
      this.router.navigateByUrl('/upload');      
    }
    else if(this.loginObj.email==""){
      alert("Please Enter Email");
    }
    else if(this.loginObj.password==""){
      alert("Please Enter Password");
    }
    else{
      alert("Wrong Credential");
    }
  };
  
}
