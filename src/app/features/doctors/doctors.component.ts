/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:'app-doctors'
 * @param {any} templateUrl:'./doctors.component.html'
 * @param {any} styleUrls:['./doctors.component.scss']}
 * @returns {any}
 */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  constructor(private firebase: AngularFireStorage) {
    // const things = db.collection('images').valueChanges();
    // things.subscribe(console.log);

  }

  ngOnInit() {
  }
  

}
