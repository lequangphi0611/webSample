/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:'app-patients'
 * @param {any} templateUrl:'./patients.component.html'
 * @param {any} styleUrls:['./patients.component.scss']}
 * @returns {any}
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
