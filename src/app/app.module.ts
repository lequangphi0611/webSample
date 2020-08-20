/**
 * 描述
 * @date 2019-12-01
 * @param {any} http:HttpClient
 * @returns {any}
 */
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxPaginationModule } from "ngx-pagination";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { FeaturesComponent } from "./features/features.component";
import { MaterialModule } from "./material.module";
import { SharedModule } from "./shared/shared.module";
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppRoutingRedirectionComponent } from './app-routing-redirect.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const firebaseConfig = {
  apiKey: "AIzaSyBfMOwQNa22x8mq6wXXxbh0eT-weN_IRJs",
  authDomain: "medical-58922.firebaseapp.com",
  databaseURL: "https://medical-58922.firebaseio.com",
  projectId: "medical-58922",
  storageBucket: "medical-58922.appspot.com",
  messagingSenderId: "652357383361",
  appId: "1:652357383361:web:61ce227bc0932732b95040",
  measurementId: "G-TX0B90NF3T"
};

@NgModule({
  declarations: [AppComponent, FeaturesComponent, AppRoutingRedirectionComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PerfectScrollbarModule,
    NgxPaginationModule,
    MaterialModule,
    NgxPermissionsModule.forRoot(),
    // firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [
    { provide: StorageBucket, useValue: firebaseConfig.storageBucket }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
