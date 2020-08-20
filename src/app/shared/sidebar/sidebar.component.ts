import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { User } from "app/core/domain/model/user";
import { AccountService } from "app/core/domain/services/account.service";
import { customAnimations } from "../animations/custom-animations";
import { ConfigService } from "../services/config.service";
import { ROUTES, ROUTES_DOCTOR, ROUTES_NURSE, ROUTES_PATIENT } from "./sidebar-routes.config";
import { ROLE } from '../config';
import { AuthorityService } from 'app/core/domain/services/authority.service';
import { Authority } from 'app/core/domain/model/authority';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild("toggleIcon", { static: false }) toggleIcon: ElementRef;
  public menuItems: any[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = "assets/img/logo.png";
  public config: any = {};
  private user: User;
  public authorities: Authority[];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private configService: ConfigService,
    private accountService: AccountService,
    private authorityService: AuthorityService
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    this.getCurrentUser();

    if (this.config.layout.sidebar.backgroundColor === "white") {
      this.logoUrl = "assets/img/logo-dark.png";
    } else {
      this.logoUrl = "assets/img/logo.png";
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed != undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(
            this.toggleIcon.nativeElement,
            "ft-toggle-left"
          );
          this.renderer.removeClass(
            this.toggleIcon.nativeElement,
            "ft-toggle-right"
          );
          this.nav_collapsed_open = true;
        } else if (this.config.layout.sidebar.collapsed === false) {
          this.expanded = true;
          this.renderer.removeClass(
            this.toggleIcon.nativeElement,
            "ft-toggle-left"
          );
          this.renderer.addClass(
            this.toggleIcon.nativeElement,
            "ft-toggle-right"
          );
          this.nav_collapsed_open = false;
        }
      }
    }, 0);
  }

  public getCurrentUser() {
    this.accountService.getCurrentUserLogged().subscribe(res => {
      this.user = res;

      if (this.user.authoritiesAsString.indexOf(ROLE.ADMIN) !== -1) {
        this.menuItems = ROUTES;
      } else if (this.user.authoritiesAsString.indexOf(ROLE.DOCTOR) !== -1) {
        this.menuItems = ROUTES_DOCTOR;
      } else if (this.user.authoritiesAsString.indexOf(ROLE.NURSE) !== -1) {
        this.menuItems = ROUTES_NURSE;
      } else if (this.user.authoritiesAsString.indexOf(ROLE.PATIENT) !== -1) {
        this.menuItems = ROUTES_PATIENT;
      }

    });
  }

  public getAllRoles() {
    // this.authorityService.findAll().subscribe(res => {
      // this.authorities = res;
      // this.getCurrentUser();
    // });
  }

  public toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  public handleToggle(titles) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf("forms/ngx") !== -1) {
      this.router.navigate(["forms/ngx/wizard"], { skipLocationChange: false });
    }
  }
}
