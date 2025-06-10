import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../services/auth-service.service';
import { User } from '../../../models/User';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginFormGroup! : FormGroup;
  CreateAccountFormGroup! : FormGroup;
  selectedNextOrPrivois : string = "previous";

  constructor(private fb : FormBuilder, 
              private authService : AuthServiceService,
              private router : Router,
              private snackBar: MatSnackBar) {}

  ngOnInit() : void {
    this.loginFormGroup = this.fb.group({
      email : this.fb.control(null,Validators.required),
      password : this.fb.control(null,Validators.required),
    });

    this.CreateAccountFormGroup = this.fb.group({
      firstName : this.fb.control(null,Validators.required),
      lastName : this.fb.control(null,Validators.required),
      age : this.fb.control(null,Validators.required),
      email : this.fb.control(null,Validators.required),
      password : this.fb.control(null,Validators.required),
      confirmedPassword : this.fb.control(null,Validators.required),
      isAdmin : this.fb.control(false),
      adminCode : this.fb.control(null,Validators.required),
    });
  }

  Login(){
    let email = this.loginFormGroup.value.email;
    let password = this.loginFormGroup.value.password;

    this.authService.login(email , password).subscribe({    
      next : (user) => {
        this.router.navigateByUrl("/home");
      },
      error : (error) => {
        this.showNotification(error);
      }
    });
  }

  Guest(){
    this.authService.setGuestLocalStorage();
    this.router.navigateByUrl("/home");
  }

  CreateAccount(){
    let firstName = this.CreateAccountFormGroup.value.firstName;
    let lastName = this.CreateAccountFormGroup.value.lastName;
    let age = this.CreateAccountFormGroup.value.age;
    let email = this.CreateAccountFormGroup.value.email;
    let password = this.CreateAccountFormGroup.value.password;
    let confirmedPassword = this.CreateAccountFormGroup.value.confirmedPassword;
    let isAdmin = this.CreateAccountFormGroup.value.isAdmin;
    let adminCode = this.CreateAccountFormGroup.value.adminCode;

    if(password != confirmedPassword){
      this.showNotification('Error: Incorrect retyped password!');
    }
    else{
      if(isAdmin == true){
        if(adminCode == 1234){
          this.authService.createtUser(new User(firstName,lastName,age,email,password,'admin')).subscribe({
            next : (user) => {
              //this.router.navigateByUrl("/user/home/"+user.firstName+"/"+user.lastName+"/"+user.role+"/"+user.id);
              this.router.navigateByUrl("/home/"+user.id);
              this.showNotification('Congratulations! You have registred successfully.');
            },
            error : () => {
              this.showNotification('An error occurred. Please try again.');
            }
          });
        }
        else{
          this.showNotification('Error: Wrong admin code!');
        }
      }
      else{
        this.authService.createtUser(new User(firstName,lastName,age,email,password,'user')).subscribe({
          next : (user) => {
            this.router.navigateByUrl("home/"+user.id);
            this.showNotification('Congratulations! You have registred successfully.');
          },
          error : (error) => {
            this.showNotification('An error occurred. Please try again.');
          }
        });
      }
    }

  }

  NextOrPrevious(param : string){
    this.selectedNextOrPrivois = param;
  }

  setupJavaScript() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

      registerBtn!.addEventListener('click', () => {
        container!.classList.add("active");
      });

      loginBtn!.addEventListener('click', () => {
        container!.classList.remove("active");
      });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center', // Position horizontally
      verticalPosition: 'top', // Position vertically
    });
  }

}
