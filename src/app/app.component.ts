/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:"app-root"
 * @param {any} template:`<router-outlet></router-outlet>`}
 * @returns {any}
 */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationEnd, Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import { filter } from "rxjs/operators";
import { AuthenticationService } from "./core/authentication/authentication.service";
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  /**
   *Creates an instance of AppComponent.
   * @param {AngularFireStorage} afStorage
   * @param {Router} router
   * @param {ActivatedRoute} activatedRoute
   * @param {AuthenticationService} authenticateService
   * @param {Title} titleService
   * @memberof AppComponent
   */
  constructor(
    private afStorage: AngularFireStorage,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticateService: AuthenticationService,
    private titleService: Title
  ) {}

  /**
   * @description
   * @memberof AppComponent
   */
  ngOnInit() {
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => window.scrollTo(0, 0));

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === "primary")
      .mergeMap(route => route.data)
      .subscribe(event => this.titleService.setTitle(event["title"]));
  }

  /**
   * @description
   * @memberof AppComponent
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
