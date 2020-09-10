import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ExpenseService } from 'src/app/expense.service';
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common'
import { SocketService } from 'src/app/socket.service';
@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css'],
  providers: [Location]
})
export class ExpenseDetailComponent implements OnInit {
  public expenseId: string;
  public userDetail;
  public expenseDetail: any;
  //public comments: any[] = [];
  //public newComment: string;
 // public assignee: any;
  //public watchers: any[] = [];
  public members: any;
  public membersDetail;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private userService: UserService,
    private toastr: ToastrService,
    private location: Location,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.expenseId = this.route.snapshot.paramMap.get('expenseId');
    this.userDetail = this.userService.getUserDetailsFromLocalStorage();
    this.membersDetail = this.userService.getUserDetailsFromLocalStorage();
    this.getexpenseDetail()
    //console.log(this.expenseId)
  }
  //getting detail of expense
  public getexpenseDetail() {
    if (this.expenseId) {
      this.expenseService.getexpenseDetail(this.expenseId, this.userDetail.authToken).subscribe(
        (apiresponse) => {
          if (apiresponse['status'] === 200) {
            //console.log(apiresponse)
            this.expenseDetail = apiresponse['data'];
            if (apiresponse['data']['comments'].length > 0) {
              //this.comments = apiresponse['data']['comments'];
              //this.comments = this.comments.reverse();

            }

            //this.assignee = apiresponse['data']['assignee'];
            //this.watchers = apiresponse['data']['watchers'];
            //console.log(this.watchers)
            //console.log(this.comments)
            //this.addWatchingStatus();
            this.members = apiresponse['data']['members']
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

  //add watching status
 /* public addWatchingStatus() {
    //if current expense reporter is the user itself then dont do anything if not then set status
    //on the basis of watcherlist
    if (this.userDetail.userId != this.expenseDetail.reporter.reporterId) {
      if (this.expenseDetail.watchers.length > 0) {
        this.expenseDetail.watchers.forEach((watcher) => {
          if (watcher.watcherId === this.userDetail.userId) {
            this.expenseDetail.watchingStatus = 'watching'
          }
          else {
            this.expenseDetail.watchingStatus = 'watch';
          }
        })
      }
      else {
        this.expenseDetail.watchingStatus = "watch";
        //console.log(this.expenseDetail)
      }

    }
  }

  //watching the current expense
  public watchexpense() {
    let data =
    {
      expenseId: this.expenseDetail.expenseId,
      watcherId: this.userDetail.userId,
      watcherName: this.userDetail.firstName,
      authToken: this.userDetail.authToken
    }

    this.expenseService.addWatcher(data).subscribe(
      (apiresponse) => {
        if (apiresponse['status'] === 200) {
          //console.log('status 200 : ',apiresponse);
          this.expenseDetail.watchingStatus = 'watching';
          this.watchers.push(apiresponse['data']);
          this.notifyUpdates();
        }
        else {
          this.toastr.error(apiresponse['message']);
        }
      },
      (error) => {
        setTimeout(() => {
          this.router.navigate(['/server/error'])
        }, 2000);
      }
    )
  }
*/
  //notifying updates about adding in expense group
  public notifyUpdates() {
    let data =
    {
      expenseId: this.expenseDetail.expenseId,
      //assignee: this.expenseDetail.assignee,
      members: this.expenseDetail.members,
      group: this.expenseDetail.group,
      //reporter: this.expenseDetail.reporter,
      //watchers: this.expenseDetail.watchers,
      userId: this.userDetail.userId,
      memberId: this.membersDetail.memberId,
      //message: `${this.userDetail.firstName} is watching an expense`
      message: `${this.membersDetail.firstName} is added in the expense group`
    }

    this.socketService.notifyUpdates(data)
  }
/*
  //adding new comment
  public addComment() {
    if (this.newComment) {

      let data =
      {
        comment: this.newComment,
        userId: this.userDetail.userId,
        firstName: this.userDetail.firstName,
        authToken: this.userDetail.authToken,
        expenseId: this.expenseId
      }

      //calling service function for adding comment
      this.expenseService.addComment(data).subscribe(
        (apiresponse) => {
          if (apiresponse['status'] === 200) {
            this.toastr.success('comment added');
            //console.log(apiresponse)
            this.comments.unshift(apiresponse['data'])
            //this.getexpenseDetail();
            this.notifyAddedComment()
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
    }

    //after adding comment,empty newComment
    this.newComment = "";
  }

  //notify added commnent
  public notifyAddedComment() {
    let data =
    {
      userId: this.userDetail.userId,
      watchers: this.expenseDetail.watchers,
      reporter: this.expenseDetail.reporter,
      assignee: this.expenseDetail.assignee,
      expenseId: this.expenseDetail.expenseId,
      message: `${this.userDetail.firstName} has added a new comment`

    }
    this.socketService.notifyUpdates(data);

  }

  //adding comment by keypress enter
  public addCommentByKeyPress(event) {
    if (event.keyCode === 13) {
      this.addComment()
    }
  }
*/
  //navigating back on clicking back button
  public navigateBack() {
    this.location.back()
  }

}
