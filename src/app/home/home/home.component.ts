import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  emailFormControl = new FormGroup({
    email : new FormControl(''),
    password: new FormControl('')
  })

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.emailFormControl = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      password: [null, Validators.compose([Validators.required,Validators.minLength(8)])],
    })
  }

  save() {
    this.router.navigate(['/success']);
  }

}
