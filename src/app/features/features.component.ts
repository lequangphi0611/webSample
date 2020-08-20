/**
 * 描述
 * @date 2019-12-01
 * @param {any} {selector:'app-features'
 * @param {any} templateUrl:'./features.component.html'
 * @param {any} styleUrls:['./features.component.scss']}
 * @returns {any}
 */
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ConfigService } from 'app/shared/services/config.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarBgImage', { static: false }) sidebarBgImage: ElementRef;
  @ViewChild('appSidebar', { static: false }) appSidebar: ElementRef;
  @ViewChild('wrapper', { static: false }) wrapper: ElementRef;

  public options = {
    direction: 'ltr',
    bgColor: 'black',
    bgImage: 'assets/img/sidebar-bg/01.jpg'
  };
  public hideSidebar: boolean;
  public iscollapsed = false;
  public isSidebar_sm = false;
  public isSidebar_lg = false;
  public bgColor = 'black';
  public bgImage = 'assets/img/sidebar-bg/01.jpg';

  public config: any = {};

  /**
   *Creates an instance of FeaturesComponent.
   * @param {ElementRef} elementRef
   * @param {ConfigService} configService
   * @param {Document} document
   * @param {Renderer2} renderer
   * @memberof FeaturesComponent
   */
  constructor(
    private elementRef: ElementRef,
    private configService: ConfigService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  /**
   * @description
   * @memberof FeaturesComponent
   */
  ngOnInit() {
    this.config = this.configService.templateConf;
    this.bgColor = this.config.layout.sidebar.backgroundColor;

    if (!this.config.layout.sidebar.backgroundImage) {
      this.bgImage = '';
    } else {
      this.bgImage = this.config.layout.sidebar.backgroundImageURL;
    }

    if (this.config.layout.variant === 'Transparent') {
      if (this.config.layout.sidebar.backgroundColor.toString().trim() === '') {
        this.bgColor = 'bg-glass-1';
      }
    } else {
      if (this.config.layout.sidebar.backgroundColor.toString().trim() === '') {
        this.bgColor = 'black';
      }
    }

    setTimeout(() => {
      if (this.config.layout.sidebar.size === 'sidebar-lg') {
        this.isSidebar_sm = false;
        this.isSidebar_lg = true;
      } else if (this.config.layout.sidebar.size === 'sidebar-sm') {
        this.isSidebar_sm = true;
        this.isSidebar_lg = false;
      } else {
        this.isSidebar_sm = false;
        this.isSidebar_lg = false;
      }
      this.iscollapsed = this.config.layout.sidebar.collapsed;
    }, 0);
  }

  /**
   * @description
   * @memberof FeaturesComponent
   */
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.config.layout.dir) {
        this.options.direction = this.config.layout.dir;
      }

      if (this.config.layout.variant === 'Dark') {
        this.renderer.addClass(this.document.body, 'layout-dark');
      } else if (this.config.layout.variant === 'Transparent') {
        this.renderer.addClass(this.document.body, 'layout-dark');
        this.renderer.addClass(this.document.body, 'layout-transparent');
        if (this.config.layout.sidebar.backgroundColor) {
          this.renderer.addClass(
            this.document.body,
            this.config.layout.sidebar.backgroundColor
          );
        } else {
          this.renderer.addClass(this.document.body, 'bg-glass-1');
        }
        this.bgColor = 'black';
        this.options.bgColor = 'black';
        this.bgImage = '';
        this.options.bgImage = '';
        this.bgImage = '';
        this.renderer.setAttribute(
          this.sidebarBgImage.nativeElement,
          'style',
          'display: none'
        );
      }
    }, 0);
  }

  /**
   * @description
   * @param {boolean} $event
   * @memberof FeaturesComponent
   */
  toggleHideSidebar($event: boolean): void {
    setTimeout(() => {
      this.hideSidebar = $event;
    }, 0);
  }

  /**
   * @description
   * @param {*} $event
   * @memberof FeaturesComponent
   */
  getOptions($event): void {
    this.options = $event;
  }
}
