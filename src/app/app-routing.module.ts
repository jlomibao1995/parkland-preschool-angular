import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassesComponent } from './classes/classes.component';
import { GuardianPaymentsComponent } from './guardian-payments/guardian-payments.component';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PayRegistrationFeeComponent } from './pay-registration-fee/pay-registration-fee.component';
import { PaymentsComponent } from './payments/payments.component';
import { RegisterChildComponent } from './register-child/register-child.component';
import { RegistrationsGuardianComponent } from './registrations-guardian/registrations-guardian.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup/:uuid', component: SignupComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'passwordreset', component: ResetPasswordComponent},
  {path: 'passwordreset/:uuid', component: ResetPasswordComponent},
  {path: 'admin/registrations', component: RegistrationsComponent},
  {path: 'guardian/register', component: RegisterChildComponent},
  {path: 'admin/classes', component: ClassesComponent},
  {path: 'admin/accounts', component: AccountsComponent},
  {path: 'admin/payments', component: PaymentsComponent},
  {path: 'staff/classlist/:classId', component: ClassListComponent},
  {path: 'myaccount', component: MyAccountComponent},
  {path: 'checkout/:invoiceId', component: CheckoutComponent},
  {path: 'guardian/register/:id', component: PayRegistrationFeeComponent},
  {path: 'guardian/payments', component: GuardianPaymentsComponent},
  {path: '', redirectTo: '/myaccount', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
