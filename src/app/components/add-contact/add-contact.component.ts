import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public loading:boolean=false
  
  public contact:IContact={} as IContact;
  public errorMessage: String | null=null;
  public groups:IGroup[] ={} as IGroup[];

  constructor(private contactservice: ContactService, private router:Router) { }

  ngOnInit(): void {
    this.contactservice.getAllGroups().subscribe((data)=>{
     this.groups=data;
    },(error)=>{
      this.errorMessage=error
    })
  }


  public createSubmit(){
    this.contactservice.createContact(this.contact).subscribe(data=>{
      this.router.navigate(['/']).then();

    },
    error=>{
      this.router.navigate(['/contacts/add']).then();
    })
  }

}
