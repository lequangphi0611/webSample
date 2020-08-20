/**
 * 描述
 * @date 2019-12-01
 * @param {any} {imports:[CommonModule
 * @param {any} DashboardRoutingModule
 * @param {any} ChartistModule
 * @param {any} NgbModule
 * @param {any} MatchHeightModule]
 * @param {any} declarations:[DashboardComponent]}
 * @returns {any}
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // ChartistModule,
    NgbModule,
    // MatchHeightModule
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
