import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { DBManagerService } from '../utils/db-manager.service';
import { Constants } from '../utils/constants.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  error_msg: string;
  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
    const userData = DBManagerService.getData(Constants.USER_DATA_KEY);
    if (userData) {
      this.router.navigate(['/layout']);
    }
  }
  onCreateUser(form: NgForm) {
    const formData = form.form.value
    const username = formData['username'] || '';
    const loginname = formData['loginname'] || '';
    const userPassword = formData['password'] || '';
    if (username.length <= 6) {
      return this.error_msg = "Username must be at least 6 characters long";
    }
    if (userPassword.length == 0) {
      return this.error_msg = "Password cannot be empty";
    }
    this.error_msg = ''
    // return
    this.loginservice.userCreate(username, loginname, userPassword, 3).subscribe(res => {
      if (res['status']) {
        alert(res['msg']);
      } else {
        if (res['msg']) {
          this.error_msg = res['msg'];
        } else {
          alert('Failed to create User');
        }
      }
    })
  }
}
