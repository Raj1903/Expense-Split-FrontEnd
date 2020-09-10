import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AllExpensesComponent } from './dashboard/all-expenses/all-expenses.component';
import { CreateExpenseComponent } from './dashboard/create-expense/create-expense.component';
import { CreateGroupComponent } from './dashboard/create-group/create-group.component';
import { ExpenseDetailComponent } from './dashboard/expense-detail/expense-detail.component';
import { HomeComponent } from './dashboard/home/home.component';
//import { MyExpenseComponent } from './dashboard/my-expense/my-expense.component';
//import { SearchViewComponent } from './dashboard/search-view/search-view.component';


import { from } from 'rxjs';

const routes: Routes = [
  {path: 'signup', component:SignupComponent},
  {path:'',redirectTo:'signup',pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'forgot/password', component:ForgotPasswordComponent},
  {path: 'expenses', component:ExpenseDetailComponent},
  {path: 'group', component:CreateGroupComponent},
  {path: 'expense/:groupId/expense', component:CreateExpenseComponent},
  {path: 'expense/:expenseId/view',component:ExpenseDetailComponent},
  //{path: 'expense/:expenseId/myexpense', component:MyExpenseComponent},
  {path: 'home',component:HomeComponent},
  //{path: 'search/:searcExpense/view', component: SearchViewComponent},
  {path: '**', component:NotFoundComponent},
  {path: 'server/error', component:ServerErrorComponent},
  {path: 'expense', component:AllExpensesComponent},
  
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
