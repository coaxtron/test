import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  id = 0;
  valueId:any;

  public openForm:boolean = true;

  public users:any;

  public userFrom = new FormGroup({
    name : new FormControl(''),
    job: new FormControl(''),
    email: new FormControl(''),
    avatar: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: LoginService,
    ) { }

  ngOnInit(): void {
  this.loadUser();
    this.userFrom = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      job: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      avatar: [null, Validators.compose([Validators.required])]
    })
  }

  // Create New User
  public createUser() {
    this.userService.create(this.userFrom.value).subscribe(res => {
      this.loadUser();
      this.userFrom.reset();
    })
    // this.router.navigate(['/success']);
  }

  // Load user
  private loadUser() {
    return this.userService.userList().subscribe((data: {}) => {
      this.users = data;
    })
  }

  // Delete User
  public remove(id:number) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.userService.delete(id).subscribe(data => {
        this.loadUser()
      })
    }

  }

  // Update User
  public openFormField(id:number) {
    this.userFrom.patchValue({'name': this.users[id].name});
    this.userFrom.patchValue({'job': this.users[id].job});
    this.userFrom.patchValue({'email': this.users[id].email});
    this.userFrom.patchValue({'avatar': this.users[id].avatar});
    this.id = this.users[id].id;
    this.openForm = false;

  }
  public edit(){
    this.userService.update(this.id, this.userFrom.value).subscribe(data => {
      this.loadUser();
      this.openForm = true;
      this.userFrom.reset();
    })
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}


}
