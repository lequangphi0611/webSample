import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/domain/services/account.service';
import { Profile } from 'app/core/domain/model/profile';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gender } from 'app/features/doctors/doctors-dialog-form/doctors-dialog-form.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  public patientForm: FormGroup;
  public user: Profile;
  public genders: Gender[] = [
    { id: 0, value: "Chọn giới tính" },
    { id: 1, value: "Nam" },
    { id: 2, value: "Nữ" },
    { id: 3, value: "Khác" }
  ];
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    ){}

  ngOnInit() {
    this.buildForm();
    this.getCurrentUser();
  }

  public getCurrentUser(): any {
    this.accountService.getCurrentUserLogged().subscribe(res => {
      this.user = res;
      this.patchValue(this.user)
    })
  }

  buildForm() {
    this.patientForm = this.fb.group({
      firstName: ["", [Validators.required]],
      email: [""],
      phone: [
        {
          value: "",
        },
        [Validators.required, Validators.minLength(7), Validators.maxLength(12)]
      ],
      gender: [this.genders[0].id],
      address: [""],
      studying: [""],
      experience: [""],
      intro: [""],
      birthday: [""]
    });
  }

  patchValue = (model: Profile) => {
    this.patientForm.patchValue({
      firstName: model.lastName +" "+ model.firstName,
      email: model.email,
      phone: model.phone.substring(1, model.phone.length),
      address: model.address,
      gender: model.gender,
      studying: model.studying,
      experience: model.experience,
      intro: model.intro,
      birthday: model.birthday
    });
  };
}
