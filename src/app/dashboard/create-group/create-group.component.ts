import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';
import { ExpenseService } from 'src/app/expense.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
  providers: [Location]
})
export class CreateGroupComponent implements OnInit {
  public group: string;
  public date: string;
  //public statusOptions = ['backlog', 'in-progress', 'in-test', 'done'];
  //public selectedStatus;
  public selectedmembers;
  private myAuth: any;
  private userDetail;
  public allUsersIncludingMe;
  //public dropdownSelected: any = "assign-to";//for changing text of dropdown button dynamically;
  public dropdownSelected: any = "members add";

  constructor( private location: Location,
    private toastr: ToastrService,
    private userService: UserService,
    private expenseService: ExpenseService,
    private router: Router) { }

  ngOnInit(): void {
    this.userDetail = this.userService.getUserDetailsFromLocalStorage();
    this.myAuth = this.userDetail.authToken;
    this.getAllUsers()
  }
  public createGroup(){
    // public createexpense() {
       if (this.group && this.date /*&& this.selectedStatus*/ ) {
         let data: any;
   
         // if members is selected then this data will be send
         if (this.selectedmembers) {
           data =
             {
               group: this.group,
               //status: this.selectedStatus,
               date: this.date,
               membersId: this.selectedmembers.userId,
               membersName: this.selectedmembers.firstName + " " + this.selectedmembers.lastName,
               authToken: this.myAuth,
               //reporterId: this.userDetail.userId,
               //reporterName: this.userDetail.firstName  //stored in local storage
             };
         }
         // if not selected then this data will be sent
         else {
           data =
             {
               group: this.group,
               //status: this.selectedStatus,
               date: this.date,
               authToken: this.myAuth,
               //reporterId: this.userDetail.userId,
               //reporterName: this.userDetail.firstName
             }
   
         }
   
         // make call to service for creating expense
         //this.expenseService.createexpense(data).subscribe(
           this.expenseService.createGroup(data).subscribe(
           (apiresponse) => {
             if (apiresponse['status'] === 200) {
               //console.log(apiresponse)
               //this.toastr.success('expense created');
               this.toastr.success('groupCreated');
               //let expenseId = apiresponse['data']['expenseId'];
               let groupId = apiresponse['data']['groupId'];
               setTimeout(() => {
                 //this.router.navigate([`expense/${expenseId}/view`])
                 //this.router.navigate([`expense/${expenseId}/edit`])
                 this.router.navigate([`expense/${groupId}/expense`])
               }, 1000)
             }
             else {
               this.toastr.error(apiresponse['message'])
             }
   
           },
           (error) => {
             setTimeout(() => {
               this.router.navigate(['/server/error'])
             }, 2000);
           }
         )
         //console.log(data)
       }
       else {
         this.toastr.warning('one or more field is missing')
       }
     }//end of creating expense
   
     //getting all users
     public getAllUsers() {
       this.userService.getAllUsers(this.myAuth).subscribe(
         (apiresponse) => {
           //console.log(apiresponse)
           if (apiresponse['status'] === 200) {
             let allUsers = apiresponse['data'];
             this.removeMyselfFromAllUsers(allUsers)
           }
         },
         (error) => {
           setTimeout(() => {
             this.router.navigate(['/server/error'])
           }, 2000);
         }
       )
     }//end of getting all users
   
     //removing myself from all users
     public removeMyselfFromAllUsers(allUsers) {
       allUsers.forEach((user, index) => {
         if (user.userId === this.userDetail.userId) {
           allUsers.splice(index, 1);
         }
       })
   
       this.allUsersIncludingMe = allUsers;
     }//end of removing myself from all users
   
     //userdetail of user selected from dropdown of members
     public selectedUser(user) {
       //change dropdownselcected button name to user selected name
       this.dropdownSelected = user.firstName;
   
       //initialize selectedmembers
       this.selectedmembers = user;
     }
   
   
   
     public navigateBack() {
       this.location.back()
     }
   
     public focused() {
       //console.log('focused')
     }
   

}
