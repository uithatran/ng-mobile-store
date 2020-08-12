import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  public users: any;
  public error: string = '';
  public alertEror = document.getElementsByClassName('alert-error');


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mainForm();
  }

  mainForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get f() {
    return this.loginForm.controls;
  }

  getUsers() {
    this.authService.getUsers().subscribe((data) => { this.users = data });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return false;
    } else {
      this.authService.loginPost(this.loginForm.value).subscribe(
        (res) => {
          localStorage.setItem("token", res.token);
          this.router.navigateByUrl('admin/product/create');
          // this.getUsers();
        }, (error) => {
          this.error = 'Login failed.';
          setTimeout(() => {
            this.error = '';
            this.loginForm.controls.password.reset();
            this.submitted = false;
          }, 1500);
        }
      )
    }
  }

}
