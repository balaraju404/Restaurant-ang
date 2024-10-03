import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { DBManagerService } from '../utils/db-manager.service';
import { Constants } from '../utils/constants.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading: boolean = false
  error_msg: string;
  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
    const userData = DBManagerService.getData(Constants.USER_DATA_KEY)
    if (userData) {
      this.router.navigate(['/layout']);
    }
  }
  onLogin(form: NgForm) {
    const formData = form.form.value
    const username = formData['username'] || '';
    const userPassword = formData['password'] || '';
    if (username.length <= 6) {
      return this.error_msg = "Username must be at least 6 characters long";
    }
    if (userPassword.length == 0) {
      return this.error_msg = "Password cannot be empty";
    }
    this.error_msg = ''
    this.isLoading = true
    this.loginservice.loginCheck(username, userPassword).subscribe(res => {
      this.isLoading = false
      if (res['status']) {
        alert(res['msg']);
        DBManagerService.setData(res['data'], Constants.USER_DATA_KEY)
        if (res['data']['role_id'] == 3) {
          this.router.navigate(['/layout/restaurants']);
          return
        }
        this.router.navigate(['/layout']);
      } else {
        alert(res['msg'] || JSON.stringify(res));
      }
    }, err => {
      this.isLoading = false
      alert(JSON.stringify(err));
    })
  }
}
