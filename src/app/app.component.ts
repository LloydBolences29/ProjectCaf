import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import {CommonService} from './common.service';

import {Http, Response, Headers, RequestOptions, } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private newService :CommonService,){}
    Repdata;
    valbutton ="Save";

    ngOnInit(){
      this.newService.GetUser().subscribe(data => this.Repdata = data)

    }
    onSave = function(user,isValid: boolean) {
      user.mode = this.valButton;
      this.newService.saveUser(user)
      .subscribe(data => { alert(data.data);
        this.ngOnInit();

      }
      , error => this.errorMessage = error)

    }

    edit = function (kk){
      this.id = kk.id;
      this.name = kk.name;
      this.address =  kk.addres;
      this.valButton = "Update";
      
    }

    delete = function(id) {
      this.newService.deleteUser(id)
      .subscribe(data => {alert(data.data);
      this.ngOnInit();
      },
      error => this.errorMessage = error )
    }
  
}
