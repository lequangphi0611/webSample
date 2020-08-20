/**
 * 描述
 * @author duannh
 * @date 2019-12-01
 * @param {any} {selector:'app-register'
 * @param {any} templateUrl:'./register.component.html'
 * @param {any} styleUrls:['./register.component.scss']}
 * @returns {any}
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @param {any} privaterouter:Router
   * @param {any} privateauthService:AuthenticationService
   * @returns {any}
   */
  constructor(private router: Router,
    private authService: AuthenticationService) { }

  /**
   * 描述
   * @author duannh
   * @date 2019-12-01
   * @returns {any}
   */
  ngOnInit() {
  }

}
