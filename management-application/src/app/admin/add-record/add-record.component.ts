import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { catchError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css'],
})
export class AddRecordComponent implements OnInit {
  // change password input type
  passwordType: string = 'password';
  // change confirm password input type
  confirmPasswordType: string = 'password';
  // check if email exists in database
  emailExists: boolean = false;
  // check if password  and confirm password match
  passwordsNotMatched: boolean = false;
  // error alert
  error: boolean = false;
  // success alert
  success: boolean = false;
  // adduser form
  addUserForm!: FormGroup;
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.email],
      profession: [''],
      phoneNumber: [''],
      password: [''],
      confirmPassword: [''],
    });
    // auth guard
    if (localStorage.getItem('loggedInUser')) {
      this.route.navigateByUrl('/page-not-found');
    }
  }

  // submit new user
  submitNewUser() {
    if (
      this.addUserForm.value.firstName == 0 ||
      this.addUserForm.value.email == 0 ||
      this.addUserForm.value.profession == 0 ||
      this.addUserForm.value.password == 0 ||
      this.addUserForm.value.confirmPassword == 0
    ) {
      this.addUserForm = this.formBuilder.group({
        firstName: [this.addUserForm.value.firstName, Validators.required],
        lastName: [this.addUserForm.value.lastName],
        email: [
          this.addUserForm.value.email,
          [Validators.required, Validators.email],
        ],
        profession: [this.addUserForm.value.profession, Validators.required],
        phoneNumber: [this.addUserForm.value.phoneNumber],
        password: [this.addUserForm.value.password, Validators.required],
        confirmPassword: [
          this.addUserForm.value.confirmPassword,
          Validators.required,
        ],
      });
    }
    if (this.addUserForm.valid) {
      if (
        this.addUserForm.value.password ===
        this.addUserForm.value.confirmPassword
      ) {
        this.passwordsNotMatched = false;
        this.auth
          .loginUser()
          .pipe(
            catchError(async (error) => {
              this.error = true;
              console.log(error);
            })
          )
          .subscribe((data: any) => {
            let itemIndex = data.findIndex((item: any) => {
              return item.email === this.addUserForm.value.email;
            });
            if (itemIndex !== -1) {
              this.emailExists = true;
            }

            if (itemIndex == -1) {
              this.emailExists = false;
              this.auth
                .registerUser(this.addUserForm.value)
                .subscribe((response) => {
                  console.log(response);
                  this.success = true;
                });
            }
          });
      }
      if (
        this.addUserForm.value.password !==
        this.addUserForm.value.confirmPassword
      ) {
        this.passwordsNotMatched = true;
      }
    }
  }

  // // cancel error alert
  cancelErrorAlert() {
    this.error = false;
    this.success = false;
  }
  // view password
  showPassword() {
    this.passwordType = 'text';
  }
  hidePassword() {
    this.passwordType = 'password';
  }
  // view password
  showConfirmPassword() {
    this.confirmPasswordType = 'text';
  }
  hideConfirmPassword() {
    this.confirmPasswordType = 'password';
  }
}
