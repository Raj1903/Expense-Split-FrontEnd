import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
//import { MyExpenseComponent } from './my-expense/my-expense.component';
import { HomeComponent } from './home/home.component';
//import { SearchViewComponent } from './search-view/search-view.component';
import { SharedModule } from '../shared/shared.module';
//import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [AllExpensesComponent, CreateGroupComponent, CreateExpenseComponent, ExpenseDetailComponent, HomeComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    AngularEditorModule
  ]
})
export class DashboardModule { }
