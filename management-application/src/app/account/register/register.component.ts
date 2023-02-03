import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService) {
    // this.auth.loginUser();
  }

  // register submit button click
  registerClick(registerValues: any) {
        return this.auth.registerUser(registerValues).subscribe((result: any) => {
          console.log(result)         
        });
  }
  ngOnInit(): void {}
}
