import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users:any;

  userFrom = new FormGroup({
    name : new FormControl(''),
    job: new FormControl('')
  })

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userList().subscribe(res => {
     this.users = res.data;
    })
    this.userFrom = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      job: [null, Validators.compose([Validators.required])],
    })
  }

  public save() {
    const data = {
      name: this.userFrom.value.name,
      job: this.userFrom.value.job
    };
    this.userService.create(data).subscribe(res => {
      console.log(res);
    })
    console.log(this.userFrom.value)
    // this.router.navigate(['/success']);
  }

  public remove(id:number) {
    this.userService.delete(id).subscribe(res => {
      console.log('deleted successfully')
    })

  }

  public edit(id:number) {
    this.userFrom.patchValue({'name': this.users[id - 1].first_name});
    this.userFrom.patchValue({'job': this.users[id - 1].last_name});


  }

}
