import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loading = false;
    submitted = false;
    returnUrl: any;
    error = '';

  public loginFrom = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
     }

  ngOnInit(): void {
    this.loginFrom = this.fb.group({
      username: ['',([Validators.required])],
      password: ['',([Validators.required])],
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

      // convenience getter for easy access to form fields
      get f() { return this.loginFrom.controls; }

  public login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginFrom.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

}
