import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  visible: String = "";

  constructor() { }

  ngOnInit() {
  }

  toggleModal() {
    this.visible = this.visible === "" ? "visible" : "";
  }

}
