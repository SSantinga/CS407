import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  imports: [CommonModule],
  declarations: [NavigationComponent],
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})


export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


