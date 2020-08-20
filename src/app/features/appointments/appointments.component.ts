/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:'app-appointments'
 * @param {any} templateUrl:'./appointments.component.html'
 * @param {any} styleUrls:['./appointments.component.scss']}
 * @returns {any}
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
