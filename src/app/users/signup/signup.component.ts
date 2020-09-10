import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobileNumber: number;
  public allCountries;
  public countries = [];
  public emailId: any;
  public password: any;
  public country: any;

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCountries();
    if (this.userService.getUserDetailsFromLocalStorage()) {
      this.router.navigate(['/home'])
    } 
    
  } public getCountries() {
    this.userService.getCountryNames().subscribe((data) => {
      this.allCountries = data;
      for(let current in data) {
        let singleCountry = {
          name: data[current].toUpperCase(),
          code: current.toUpperCase()
        }
        this.countries.push(singleCountry);
      }
      // console.log(this.countries)
      this.countries = this.countries.sort((first, second) => {
        return first.name > second.name ? 1 : (first.name < second.name ?  -1 :  0)
      })
    })
  } 
  public signUpFunction = () => {
    if (!this.firstName) { 
      this.toastr.warning('Please Enter Your FirstName')
    }

    else if (!this.lastName) {
      this.toastr.warning('Please Enter Your lastName');
    }

    else if (!this.mobileNumber) {
      this.toastr.warning('Please Enter Your MobileNumber')
    }
    else if (!this.country) {
      this.toastr.warning('Please Choose your country')
    }

    else if (!this.emailId) {
      this.toastr.warning('Please Enter Your EmailId');
    }

    else if (!this.password) {
      this.toastr.warning('Please Enter Your Unique Password')
    }

    else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.emailId,
        password: this.password,
        mobileNumber: this.mobileNumber,
        country:this.country
      }
      console.log(data);

      this.userService.signUpFunction(data).subscribe(
        (apiresponse) => {
          console.log(apiresponse)

          if (apiresponse['status'] === 200) {
            this.toastr.success('signup successfull');
            this.router.navigate(['/signup']) //clean Input Field
            
          }
          else {
            this.toastr.error(apiresponse['message'])
            //console.log(apiresponse)
          }
        },
        (err) => {
          setTimeout(() => {
            this.router.navigate(['/server/error'])
          }, 2000);
        }
      )
    } // end condition
  } // end SignUpFunction


}
