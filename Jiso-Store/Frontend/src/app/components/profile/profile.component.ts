import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user : any;

  constructor(private route : Router,
              private fb: FormBuilder){}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('User');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }
  }

  logout(){
    localStorage.removeItem('User');
    this.route.navigateByUrl("/login");
  }
}
