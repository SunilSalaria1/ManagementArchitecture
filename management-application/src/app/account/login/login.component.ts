import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  // login submit
  loginClick(loginValues: any) {
    console.log(loginValues);
    this.auth.loginUser().subscribe( (data:any) => {
      console.log(data);
      data.forEach( (item: any) => {
        if (item.email === loginValues.email && item.password === loginValues.password) {
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 500);
        }
      });
    });
  }
  ngOnInit(): void {}
}
