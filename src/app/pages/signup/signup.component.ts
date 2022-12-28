import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  }

  ngOnInit(): void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username == null){
      this.snack.open("Username is required !!",'',{
        duration:2000,
      })
      return;
    }
     //adduser: userservice
      this.userService.addUser(this.user).subscribe(
        (data:any)=>{
          //success
          console.log(data);
          //alert("success");
        //   this.snack.open("success",'',{
        //   duration:2000,
        // })
        Swal.fire('Successfully done !!','User id is' +data.id,'success')
        },
        (error)=>{
          //error
          console.log(error);
          //alert('something went wrong');
          this.snack.open("Username is required !!",'',{
            duration:2000,
          })
        })
  }
  //THIS.USER
 
}
