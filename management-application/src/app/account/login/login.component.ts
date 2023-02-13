import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private commonservice: CommonService
  ) {}
  ngOnInit(): void {
    // form building
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
    if (this.commonservice.authentication) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  // login submit

  loginClick() {
    if (this.loginForm.value.email == 0 && this.loginForm.value.password == 0) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    }
    this.auth
      .loginUser()
      .pipe(
        catchError(async (error) => {
          this.commonservice.asideHeader = false;
          this.commonservice.authentication = false;
          console.log(error);
        })
      )
      .subscribe((data: any) => {
        data.forEach((item: any) => {
          if (
            item.email == this.loginForm.value.email &&
            item.password == this.loginForm.value.password
          ) {
            this.commonservice.authentication = true;
            this.commonservice.asideHeader = true;
            this.router.navigateByUrl('/dashboard');
          }
        });
      });
  }
}
