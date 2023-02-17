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
  // password type
  passwordType: string = 'password';
  svgColor: string = '#000000';
  // error alert
  error: boolean = false;
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private commonservice: CommonService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: [''],
    });
    if (
      this.commonservice.authentication &&
      localStorage.getItem('loggedInUser')
    ) {
      this.router.navigateByUrl('/dashboard');
    }
    if (
      this.commonservice.authentication &&
      localStorage.getItem('loggedInAdmin')
    ) {
      this.router.navigateByUrl('/admin-portal');
    }
  }

  // login submit
  loginClick() {
    // validations
    if (this.loginForm.value.email == 0 || this.loginForm.value.password == 0) {
      this.loginForm = this.formBuilder.group({
        email: [
          this.loginForm.value.email,
          [Validators.required, Validators.email],
        ],
        password: [this.loginForm.value.password, [Validators.required]],
      });
    }
    if (this.loginForm.valid) {
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
          // check and match data
          let itemIndex = data.findIndex((item: any) => {
            return (
              item.email == this.loginForm.value.email &&
              item.password == this.loginForm.value.password
            );
          });
          if (itemIndex === -1) {
            if (
              this.loginForm.value.email.length > 0 &&
              this.loginForm.value.password.length > 0
            )
              this.error = true;
          }
          if (itemIndex !== -1) {
            if (data[itemIndex].role == 'admin') {
              this.commonservice.authentication = true;
              this.commonservice.asideHeader = true;
              this.commonservice.adminPortal = true;
              localStorage.setItem('loggedInAdmin', 'true');
              localStorage.setItem('loggedInId', data[itemIndex].id);
              this.router.navigateByUrl('/admin-portal');
            } else {
              this.commonservice.authentication = true;
              this.commonservice.asideHeader = true;
              this.commonservice.dashboard = true;
              localStorage.setItem('loggedInUser', 'true');
              localStorage.setItem('loggedInId', data[itemIndex].id);
              this.router.navigateByUrl('/dashboard');
            }
          }
        });
    }
  }
  // cancel error alert
  cancelErrorAlert() {
    this.error = false;
  }

  // view password
  showPassword() {
    this.passwordType = 'text';
  }
  hidePassword() {
    this.passwordType = 'password';
  }
}
