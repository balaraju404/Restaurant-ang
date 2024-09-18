import { Component } from '@angular/core';
import { DBManagerService } from '../../utils/db-manager.service';
import { Constants } from '../../utils/constants.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  role_id: number;
  constructor() { }

  ngOnInit() {
    const userData = DBManagerService.getData(Constants.USER_DATA_KEY)
    if (userData) {
      this.role_id = userData['role_id']
    } else {
      location.href = '/login'
    }
  }
}
