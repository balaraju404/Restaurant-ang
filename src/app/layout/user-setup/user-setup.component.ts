import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrl: './user-setup.component.scss'
})
export class UserSetupComponent {
  isLoading: boolean = false
  roles: any = [
    { 'role_id': 1, 'role_name': 'System Admin' },
    { 'role_id': 2, 'role_name': 'Restaurant Admin' },
    { 'role_id': 3, 'role_name': 'User' },
    { 'role_id': 4, 'role_name': 'Restaurant User' }
  ]
  error_msg: string = ''

  constructor(private loginService: LoginService) { }

  ngOnInit() {

  }

  onCreateUser(form: NgForm) {
    const formData = form.form.value
    this.isLoading = true
    this.loginService.userCreate(formData.username, formData.loginname, formData.password, formData.role_id).subscribe((res: any) => {
      this.isLoading = false
      if (res['status']) {
        alert(res['msg'])
        form.resetForm()
      } else {
        alert(res['msg'] || JSON.stringify(res))
      }
    }, error => {
      this.isLoading = false
      alert(error.error.msg || JSON.stringify(error))
    })
  }
}
