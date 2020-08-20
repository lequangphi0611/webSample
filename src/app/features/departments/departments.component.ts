/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:'app-departments'
 * @param {any} templateUrl:'./departments.component.html'
 * @param {any} styleUrls:['./departments.component.scss']}
 * @returns {any}
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
