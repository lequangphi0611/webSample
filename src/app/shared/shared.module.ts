import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "app/material.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { SidebarDirective } from "./directives/sidebar.directive";
import { SidebarAnchorToggleDirective } from "./directives/sidebaranchortoggle.directive";
import { SidebarLinkDirective } from "./directives/sidebarlink.directive";
import { SidebarListDirective } from "./directives/sidebarlist.directive";
import { SidebarToggleDirective } from "./directives/sidebartoggle.directive";
// DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
// COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    SidebarDirective,
    NgbModule,
    TranslateModule,
    DeleteDialogComponent,
    MaterialModule,
    NgxPermissionsModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    TranslateModule,
    PerfectScrollbarModule,
    MaterialModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    SidebarDirective,
    SidebarLinkDirective,
    SidebarListDirective,
    SidebarAnchorToggleDirective,
    SidebarToggleDirective,
    DeleteDialogComponent,
  ],
  entryComponents: [DeleteDialogComponent]
})
export class SharedModule {}
