import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currUser;
  items: Array<any>;

  constructor(public auth: AuthService) { 
    // console.log(this.auth.userData);
    // let parsed = JSON.parse(this.auth.userData.ga.b.g.c.a.users);
    // this.currUs = parsed[0].firstName;
    // console.log(parsed[0].firstName);
    
    
  }

  ngOnInit(): void {
    this.auth.getUserData()
      .subscribe(result => {
        if (result){
            this.items = result;
        }
        else{
          this.items = null;
        }
      })

    //this.getCoffeeOrders("UAnWxywzOgTJLehH6YHAEztD0ZI3");
  }

  
  oncl(){
    //console.log(this.auth.userData);
    //let parsed = JSON.parse(this.auth.userData.ga.b.g.c.a.users);
    //console.log(parsed[0].firstName);
    //console.log(this.auth.userData);
  }
}
