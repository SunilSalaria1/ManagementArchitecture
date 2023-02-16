import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-passwrd',
  templateUrl: './forgot-passwrd.component.html',
  styleUrls: ['./forgot-passwrd.component.css']
})
export class ForgotPasswrdComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
     // auth guard
     if (
      localStorage.getItem('loggedInUser') ||
      localStorage.getItem('loggedInAdmin')
    ) {
      this.route.navigateByUrl('/page-not-found');
    }
  }
  

}
