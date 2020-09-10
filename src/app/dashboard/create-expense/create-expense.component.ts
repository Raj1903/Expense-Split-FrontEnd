import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ExpenseService } from 'src/app/expense.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/socket.service';
@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
  providers: [Location]
})
export class CreateExpenseComponent implements OnInit {
  public title;
  public group;
  //public description;
  public amount;
  public date;
  public members;
  //public selectedStatus;
  //public statusOptions = ['backlog', 'in-progress', 'in-test', 'done'];
  //public dropdownSelected = 'assign-to';
  public dropdownSelected = 'payer-added';
  public dropdownWhoPaid = "members who paid";
  private userDetail: any;
  public selectedmembers;
  public allUsers: any[];//this should hold users other than current user,reporter and members
  public expenseId;
  public expenseDetail;
  public groupId;
  public groupDetail;
  public memberDetails: any;
  public allMember = "members-paid";

  constructor(
    private userService: UserService,
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.userDetail = this.userService.getUserDetailsFromLocalStorage();
    //this.expenseId = this.route.snapshot.paramMap.get('expenseId');
    this.groupId = this.route.snapshot.paramMap.get('groupId');
    //this.getexpenseDetail(this.expenseId);
    this.getgroupDetail(this.groupId);
    this.getAllUsers();
  }
  //getting expense detail of passed expenseId
  //public getexpenseDetail(expenseId) {
    public getgroupDetail(groupId) {
      //if (expenseId) {
        if (groupId) {
        //this.expenseService.getexpenseDetail(expenseId, this.userDetail.authToken).subscribe(
          this.expenseService.getgroupDetail(groupId,this.userDetail.authToken).subscribe(
          (apiresponse) => {
            if (apiresponse['status'] === 200) {
              //this.expenseDetail = apiresponse['data'];
              //this.definePropertyValues(this.expenseDetail);
  
              this.groupDetail = apiresponse['data'];
             // this.definePropertyValues(this.groupDetail);
            }
          },
          (error) => {
            setTimeout(() => {
              this.router.navigate(['/server/error'])
            }, 2000);
          }
        )
      }
    }
  
    //defining properties value of edit component for current expensedetail
    //public definePropertyValues(expenseDetail) {
      public definepropertyValues(groupDetail){
      //this.group = groupDetail.group;
      //this.amount = groupDetail.amount;
      //this.selectedStatus = expenseDetail.status;
      //this.description = expenseDetail.description;
      this.group = this.groupDetail.group;
      this.amount = this.groupDetail.amount;
      this.date = this.groupDetail.date;
      this.members = this.memberDetails.membersId
    }
  
    //getting all users
    public getAllUsers() {
      this.userService.getAllUsers(this.userDetail.authToken).subscribe(
        (apiresponse) => {
          //console.log(apiresponse)
          if (apiresponse['status'] === 200) {
            //console.log('before splice ; ',apiresponse['data'])
            this.allUsers = apiresponse['data'];
  
            this.removeMyself()
          }
        },
        (error) => {
          setTimeout(() => {
            this.router.navigate(['/server/error'])
          }, 2000);
        }
      )
    }//end of getting all users
  
    //removing myself
    public removeMyself() {
  
      this.allUsers.forEach((user, index) => {
        if (user.userId === this.userDetail.userId) {
          this.allUsers.splice(index, 1);
        }
      })
  
      //remove members
      this.removemembers();
      //this.removeReporter();
    }
  
    //removing members of allusers
    public removemembers() {
      //let members = this.expenseDetail.members;
      let members = this.groupDetail.members;
      //console.log('temp asign : ',members)
  
      if (members) {
        members.forEach((single, index) => {
          this.allUsers.forEach((user, index) => {
            if (user.userId === single.membersId) {
              this.allUsers.splice(index, 1);
            }
          })
        })
      }
  
  
    }//end of remove members
  
    //removing reporter from allusers
  /*  public removeReporter() {
      //if current user is not reporter then only remove reporter id ,as current user has already been removed
      if (this.userDetail.userId != this.expenseDetail.reporter.reporterId) {
        this.allUsers.forEach((user, index) => {
          if (user.userId === this.expenseDetail.reporter.reporterId) {
            this.allUsers.splice(index, 1);
          }
        })
      }
    }//end of removing reporter
  */
  
    public selectedUser(user) {
      this.selectedmembers = user;
      this.dropdownSelected = user.firstName;
      //this.dropdownWhoPaid = members.firstName;
    }

    public paidUser(member) {
      this.selectedmembers = member;
      this.dropdownWhoPaid = member.firstName;
    }
  
    public navigateBack() {
      this.location.back();
    }
  
    //editing expense
    //public editexpense() {
      public createExpense() {
      if (this.title && this.date &&this.amount /*&& this.selectedStatus*/) {
        let data: any;
  
        // if members is selected then this data will be send
        if (this.selectedmembers)   {
          data =
            {
              title: this.title,
              amount: this.amount,
              //status: this.selectedStatus,
              //description: this.description,
              date: this.date,
              membersId: this.selectedmembers.userId,
              membersName: this.selectedmembers.firstName + " " + this.selectedmembers.lastName,
              authToken: this.userDetail.authToken,
              //expenseId: this.expenseDetail.expenseId
              groupId: this.groupDetail.groupId
            };
        }
        // if not selected then this data will be sent
        else {
          data =
            {
              title: this.title,
              amount: this.amount,
              //status: this.selectedStatus,
              //description: this.description,
              date: this.date,
              authToken: this.userDetail.authToken,
              //expenseId: this.expenseDetail.expenseId
              groupId: this.groupDetail.groupId
            }
  
        }
        //console.log('data : ', data)
  
        this.expenseService.updateExpense(data).subscribe(
          (apiresponse) => {
            if (apiresponse['status'] === 200) {
              this.toastr.success('expense created');
              setTimeout(() => {
                this.router.navigate([`/expense/${this.expenseDetail.expenseId}/view`]);
              }, 1000);
  
              //this.notifyEditedexpense();
              this.notifyCreatedExpense();
            }
            else {
              this.toastr.warning(apiresponse['message'])
            }
          },
          (error) => {
            setTimeout(() => {
              this.router.navigate(['/server/error'])
            }, 2000);
          }
        )
      }
      else {
        this.toastr.warning('fields cannot be empty');
      }
  
    }
  
    //notify about edited expense
    //public notifyEditedexpense() {
      public notifyCreatedExpense(){
      //this.getexpenseDetail(this.expenseDetail.expenseId);
      this.groupDetail(this.groupDetail.groupId);
      let data =
      {
        expenseId: this.expenseDetail.expenseId,
        expenseName: this.expenseDetail.expenseName,
        members: this.expenseDetail.members,
        //reporter: this.expenseDetail.reporter,
        //watchers: this.expenseDetail.watchers,
        userId: this.userDetail.userId,
        //message: `${this.userDetail.firstName} has expesne has updated`
        message: `${this.selectedmembers.firstName} You are added to the expense group`
      }
  
      this.socketService.notifyUpdates(data);
    }

}
