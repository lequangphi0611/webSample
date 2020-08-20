/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:'app-nurses'
 * @param {any} templateUrl:'./nurses.component.html'
 * @param {any} styleUrls:['./nurses.component.scss']}
 * @returns {any}
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.scss']
})
export class NursesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
