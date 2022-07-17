import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl:String =`http://localhost:3000`;  //json-server

  constructor(private httpClient:HttpClient) { }


  
// get All Contacts
  public getAllContacts():Observable<IContact[]>{
    let dataURL:string=`${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  // GET sigle Contact
  public getContact(contactId :string):Observable<IContact>{
    let dataURL:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError))
  }

  //create a Contact
  public createContact(contact: IContact):Observable<IContact>{
    let dataURL:string=`${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError));
  }

  // update a contact
  public updateContact(contact: IContact,contactId:string):Observable<IContact>{
    let dataURL:string=`${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError));
  }

  // Delete a Contact
  public deleteContact(contactId:string):Observable<{}>{
    let dataURL:string =`${this.serverUrl}/contacts/$(contactId)`
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError))
  }


  // Get All Groups
  public getAllGroups():Observable<IGroup[]>{
    let dataURL:string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError))
  }

  // GET single Group

  public getGroup(contact:IContact):Observable<IGroup>{
    let dataURL:string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError))
  }



  
// Error Handling
 public handleError(error:HttpErrorResponse) {
    let errorMessage:string = '';
 
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message} `;
    } else {
 
      // server-side error
      errorMessage = `Status : ${error.status}\nMessage: ${error.message} `  ;
 
    }
 
    return throwError(errorMessage);
 
  }
 


}
