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



const routes: Routes = [{ path:'',component:HomeComponent},
{path:'add-cart',component:AddCartComponent},
{path:'categories',component:CategoriesComponent},
{path:'category-page',component:CategoryPageComponent},
{path:'enter-no',component:EnterNoComponent},
{path:'checkout',component:CheckoutComponent},
{path:'empty-cart',component:EmptyCartComponent},
{path:'order-details',component:OrderDetailsComponent},
{path:'order-placed',component:OrderPlacedComponent},
{path:'order',component:OrderComponent},
{path:'product-details',component:ProductDetailsComponent},
{path:'profile',component:ProfileComponent},
{path:'sub-categories',component:SubCategoriesPopupComponent},
{path:'otp',component:OtpComponent},
{ path:'**',redirectTo:''}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
