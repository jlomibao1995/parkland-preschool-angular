import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthenticationService } from './services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationsComponent } from './registrations/registrations.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassesService } from './services/classroom.service';
import { CookieService } from './services/cookie.service';
import { AuthorizationInterceptor } from './helpers/authorization.interceptor';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { RegistrationService } from './services/registration.service';
import { SuccessErrorDialogComponent } from './success-error-dialog/success-error-dialog.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { ManualPayComponent } from './manual-pay/manual-pay.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ChildInfoComponent } from './child-info/child-info.component';
import { RegistrationDetailsComponent } from './registration-details/registration-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    RegistrationsComponent,
    ClassesComponent,
    AddClassComponent,
    ClassDetailsComponent,
    AccountsComponent,
    AddAccountComponent,
    AccountDetailsComponent,
    SuccessErrorDialogComponent,
    PaymentsComponent,
    PaymentDetailsComponent,
    AddPaymentComponent,
    ManualPayComponent,
    ChildInfoComponent,
    RegistrationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, ClassesService, CookieService, RegistrationService,
  {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}, 
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
