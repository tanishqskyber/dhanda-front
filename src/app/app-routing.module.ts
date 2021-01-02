import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCartComponent } from './add-cart/add-cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { EnterNoComponent } from './enter-no/enter-no.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { OrderComponent } from './order/order.component';
import { OtpComponent } from './otp/otp.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './rountingcomponent/home/home.component';
import { SubCategoriesPopupComponent } from './sub-categories-popup/sub-categories-popup.component';
import { AuthGuard } from './_gaurd/auth.gaurd';


const routes: Routes = [{ path:'',component:EnterNoComponent},
{path:'add-cart',component:AddCartComponent,canActivate: [AuthGuard]},
{path:'categories',component:CategoriesComponent,canActivate: [AuthGuard]},
{path:'category-page',component:CategoryPageComponent,canActivate: [AuthGuard]},
{path:'home',component:HomeComponent,canActivate: [AuthGuard]},
{path:'checkout',component:CheckoutComponent,canActivate: [AuthGuard]},
{path:'empty-cart',component:EmptyCartComponent},
{path:'order-details',component:OrderDetailsComponent,canActivate: [AuthGuard]},
{path:'order-placed',component:OrderPlacedComponent,canActivate: [AuthGuard]},
{path:'order',component:OrderComponent,canActivate: [AuthGuard]},
{path:'product-details',component:ProductDetailsComponent,canActivate: [AuthGuard]},
{path:'profile',component:ProfileComponent,canActivate: [AuthGuard]},
{path:'sub-categories',component:SubCategoriesPopupComponent,canActivate: [AuthGuard]},
{path:'otp',component:OtpComponent},
{ path:'**',redirectTo:'',pathMatch: 'full'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
