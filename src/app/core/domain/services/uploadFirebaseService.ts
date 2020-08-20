/**
 * 描述
 * @date 2019-12-01
 * @returns {any}
 */
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";

@Injectable()
export class UploadFirebaseService {
  private image: string;

  /**
   *Creates an instance of UploadFirebaseService.
   * @param {AngularFireStorage} storage
   * @param {AngularFirestore} db
   * @memberof UploadFirebaseService
   */
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  /**
   * @description
   * @returns {Observable<any[]>}
   * @memberof UploadFirebaseService
   */
  getImages(): Observable<any[]> {
    return this.db.collection("images").valueChanges();
  }

  /**
   * @description
   * @param {string} name
   * @returns
   * @memberof UploadFirebaseService
   */
  getImage(name: string) {
    this.image = `https://firebasestorage.googleapis.com/v0/b/medical-58922.appspot.com/o/${name}?alt=media&token=497ce3d1-8240-4086-b0fb-6d50d158777f`;
    return this.image;
  }

  /**
   * @description
   * @param {*} file
   * @returns
   * @memberof UploadFirebaseService
   */
  uploadFileDoctor(file: any) {
    // The storage path
    const pathRoot = "doctors";
    const path = `${pathRoot}/${new Date().getTime()}_${file.name}`;
    // The main task
    const task = this.storage.upload(path, file);

    return task;
  }

  /**
   * @description
   * @param {*} file
   * @returns
   * @memberof UploadFirebaseService
   */
  uploadFileNurse(file: any) {
    // The storage path
    const pathRoot = "nurses";
    const path = `${pathRoot}/${new Date().getTime()}_${file.name}`;
    // The main task
    const task = this.storage.upload(path, file);

    return task;
  }

  /**
   * @description
   * @param {*} file
   * @returns
   * @memberof UploadFirebaseService
   */
  uploadFilePatient(file: any) {
    // The storage path
    const pathRoot = "patients";
    const path = `${pathRoot}/${new Date().getTime()}_${file.name}`;
    // The main task
    const task = this.storage.upload(path, file);

    return task;
  }
}
