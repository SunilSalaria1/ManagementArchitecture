import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { catchError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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
  // Register form
  registerForm!: FormGroup;
  constructor(private auth: AuthService, private formBuilder: FormBuilder) {}

  // register submit button click
  registerClick() {
    if (
      this.registerForm.value.firstName == 0 ||
      this.registerForm.value.email == 0 ||
      this.registerForm.value.profession == 0 ||
      this.registerForm.value.password == 0 ||
      this.registerForm.value.confirmPassword == 0
    ) {
      this.registerForm = this.formBuilder.group({
        firstName: [this.registerForm.value.firstName, Validators.required],
        lastName: [this.registerForm.value.lastName],
        email: [
          this.registerForm.value.email,
          [Validators.required, Validators.email],
        ],
        profession: [this.registerForm.value.profession, Validators.required],
        phoneNumber: [this.registerForm.value.phoneNumber],
        password: [this.registerForm.value.password, Validators.required],
        confirmPassword: [
          this.registerForm.value.confirmPassword,
          Validators.required,
        ],
      });
    }
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.password ===
        this.registerForm.value.confirmPassword
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
              return item.email === this.registerForm.value.email;
            });
            if (itemIndex !== -1) {
              this.emailExists = true;
            }

            if (itemIndex == -1) {
              this.emailExists = false;
              this.auth
                .registerUser(this.registerForm.value)
                .subscribe((response) => {
                  console.log(response);
                  this.success = true;
                });
            }
          });
      }
      if (
        this.registerForm.value.password !==
        this.registerForm.value.confirmPassword
      ) {
        this.passwordsNotMatched = true;
      }
    }
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.email],
      profession: [''],
      phoneNumber: [''],
      password: [''],
      confirmPassword: [''],
    });
  }
  // cancel error alert
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
