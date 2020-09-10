import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  //public baseUrl = "http://backend.expense-tracker.phursang.xyz/api/v1/expense";
  public baseUrl = "http://localhost:3000/api/v1"

  constructor(
    private http: HttpClient
  ) { }
 
 public createExpense(data){
  if (data.groupId){
    //console.log('!data.groupId)
    const params = new HttpParams()
    .set('authToken', data.authToken)
    .set('title', data.title)
    .set('amount', data.amount)
    .set('date', data.date)
    .set('membersId', data.membersId)
    .set('membersName', data.memberaName)
    .set('groupId', data.groupId)
    .set('groupName', data.groupName)
    return this.http.post(`${this.baseUrl}/create`, params);
  } else {
    const params = new HttpParams()
    .set('authToekn', data.authToken)
    .set('group', data.group)
    .set('amount', data.amount)
    .set('membersName', data.membersName)
    .set('membersId', data.membersId)

    return this.http.post(`${this.baseUrl}/expenses/addexpense`, params)

  } 
} //end of creating Expense


public createGroup(data){
  if (data.membersId && data.membersName){ 
    const params = new HttpParams()
    .set('authToken', data.authToken)
    .set('group', data.group)
    .set('date', data.date)
    .set('memberId',data.memberId)
    .set('memberName', data.memberName)
    
    return this.http.post(`${this.baseUrl}/groups/addGroup`,params);
  }else {
    const params = new HttpParams()
    .set('authToekn', data.authToken)
    .set('group',data.group)
    .set('date',data.date)
    return this.http.post(`${this.baseUrl}/groups/addGroup`,params);
}

}//end of create group

//getting expenses assigned to user
public getexpensesAssigned(userId, authToken,skip) {
  return this.http.get(`${this.baseUrl}/${userId}/view/all?authToken=${authToken}&skip=${skip}`);
}

//getting all expenses
public getAllexpenses(authToken, skip) {
  //console.log('from service : ',authToken)
  return this.http.get(`${this.baseUrl}/view/all?authToken=${authToken}&skip=${skip}`)
}//end of getting all expenses



//get all expenses reported by user
/*
public expensesReportedByUser(userId, authToken, skip) {
  return this.http.get(`${this.baseUrl}/${userId}/reported/expenses?authToken=${authToken}&skip=${skip}`);
}*/

//get expense detail by expenseid
public getexpenseDetail(expenseId, authToken) {
  return this.http.get(`${this.baseUrl}/${expenseId}/view?authToken=${authToken}`)
}//end

public getgroupDetail(groupId, authToken){
  return this.http.get(`${this.baseUrl}/${groupId}/view/all/expenses?authToken=${authToken}`)
}
/*
//adding comments on expense
public addComment(data) {
  const params = new HttpParams()
    .set('authToken', data.authToken)
    .set('userId', data.userId)
    .set('firstName', data.firstName)
    .set('comment', data.comment)
    .set('expenseId', data.expenseId)

  return this.http.post(`${this.baseUrl}/comment/create`, params)
}
*/
//updating expense
/*  public updateexpense(data) {
  if (data.assigneeId && data.assigneeName) {
    const params = new HttpParams()
      .set('title', data.title)
      .set('description', data.description)
      .set('status', data.status)
      .set('assigneeId', data.assigneeId)
      .set('assigneeName', data.assigneeName)
      .set('authToken', data.authToken)

      return this.http.put(`${this.baseUrl}/${data.expenseId}/edit`,params)
  }
  else
  {
    const params = new HttpParams()
      .set('title', data.title)
      .set('description', data.description)
      .set('status', data.status)
      .set('authToken', data.authToken)

      return this.http.put(`${this.baseUrl}/${data.expenseId}/edit`,params)
  }

}//end of updating expense
*/
public updateExpense(data){
  if (data.groupId){
    //console.log('!data.groupId)
    const params = new HttpParams()
    .set('authToken', data.authToken)
    .set('title', data.title)
    .set('amount', data.amount)
    .set('date', data.date)
    .set('membersId', data.membersId)
    .set('membersName', data.memberaName)
    .set('groupId', data.groupId)
    .set('groupName', data.groupName)
    return this.http.post(`${this.baseUrl}/expenses/:expenseId/updateexpense`, params);
  } else {
    const params = new HttpParams()
    .set('authToekn', data.authToken)
    .set('group', data.group)
    .set('amount', data.amount)
    .set('membersName', data.membersName)
    .set('membersId', data.membersId)

    return this.http.post(`${this.baseUrl}/create`, params)

  } 
} //end of creating group

//adding as watcher
/*
public addWatcher(data)
{
  const params = new HttpParams()
  .set('authToken',data.authToken)
  .set('watcherId',data.watcherId)
  .set('watcherName',data.watcherName)

  return this.http.put(`${this.baseUrl}/${data.expenseId}/add/watcher`,params);
}
*/
//search for expense
public searchexpense(authToken,searchText)
{
  return this.http.get(`${this.baseUrl}/search/result?authToken=${authToken}&searchText=${searchText}`);
}

}
