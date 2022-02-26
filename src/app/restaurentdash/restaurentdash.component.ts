import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { restaurentdata } from './restaurent.model';
import { ApiService } from '../share/api.service';

@Component({
  selector: 'app-restaurentdash',
  templateUrl: './restaurentdash.component.html',
  styleUrls: ['./restaurentdash.component.css'],
})
export class RestaurentdashComponent implements OnInit {
  formvalue!: FormGroup;
  restaurentmodelobj: restaurentdata = new restaurentdata();
   allrestaurentdata: any;
   showadd!:boolean
   showbtn!:boolean;
  constructor(private formBuilder: FormBuilder, private api:ApiService) {}

  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getalldata();
  }
  clickaddresto(){
    this.formvalue.reset();
    this.showadd = true;
    this.showbtn = false;
  }
  addResto(){
    this.restaurentmodelobj.name = this.formvalue.value.name;
    this.restaurentmodelobj.email = this.formvalue.value.email;
    this.restaurentmodelobj.mobile = this.formvalue.value.mobile;
    this.restaurentmodelobj.address = this.formvalue.value.address;
    this.restaurentmodelobj.services = this.formvalue.value.services;

    this.api.postRestaurent(this.restaurentmodelobj).subscribe(res=>{
      console.log(res);
      alert("Restaurent Record Added Successfull..!!")
      let ref = document.getElementById("clear");
      ref?.click();

      this.formvalue.reset();
      this.getalldata();
    },
    err=>{
      alert("something is worng...!!")
    }
    )
  }
  getalldata(){
    this.api.getRestaurent().subscribe(res=>{
       this.allrestaurentdata = res;
    })
  }
  deleteresto(data:any){
    this.api.deleteRestaurent(data.id).subscribe(res=>{
        alert("Record Delete Successfully...!!")
        this.getalldata();
    })
  }
  oneditresto(data:any){
    this.showadd = false;
    this.showbtn = true;
    this.restaurentmodelobj.id = data.id;
    this.formvalue.controls['name'].setValue(data.name);
    this.formvalue.controls['email'].setValue(data.email);
    this.formvalue.controls['mobile'].setValue(data.mobile);
    this.formvalue.controls['address'].setValue(data.address);
    this.formvalue.controls['services'].setValue(data.services);
    this.getalldata();
  }
  updateResto(){
    this.restaurentmodelobj.name = this.formvalue.value.name;
    this.restaurentmodelobj.email = this.formvalue.value.email;
    this.restaurentmodelobj.mobile = this.formvalue.value.mobile;
    this.restaurentmodelobj.address = this.formvalue.value.address;
    this.restaurentmodelobj.services = this.formvalue.value.services;

    this.api.updateRestaurent(this.restaurentmodelobj, this.restaurentmodelobj.id).subscribe(res=>{
      alert("update Record Successfully..!!")
      let ref = document.getElementById("clear");
      ref?.click();

      this.formvalue.reset();
      this.getalldata();

    })

  }
}
