import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  items: Array<any>;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUserData()
      .subscribe(result => {
        if (result) {
          this.items = result;
        }
        else {
          this.items = null;
        }
      })
  }

}
