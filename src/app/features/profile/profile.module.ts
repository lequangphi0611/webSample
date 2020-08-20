/**
 * 描述
 * @date 2019-12-01
 * @param {any} {declarations:[ProfileComponent]
 * @param {any} imports:[CommonModule
 * @param {any} ProfileRoutingModule
 * @param {any} SharedModule]}
 * @returns {any}
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    ProfileComponent, 
    ProfileEditComponent
  ],
  imports: [CommonModule, ProfileRoutingModule, SharedModule]
})
export class ProfileModule {}
