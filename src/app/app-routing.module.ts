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
import { SearchedProductComponent } from './routingcomponent/searched-product/searched-product.component';
import { AuthGuard } from './_gaurd/auth.gaurd';
import { AddressPageComponent } from './address-page/address-page.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { DhandaLandingComponent } from './dhanda-landing/dhanda-landing.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { EmptyCategoryComponent } from './supportingcomponents/empty-category/empty-category.component';
import { EmptyProductsComponent } from './supportingcomponents/empty-products/empty-products.component';
import { EmptySubCategoryComponent } from './supportingcomponents/empty-sub-category/empty-sub-category.component';
import { EmptyOrdersComponent } from './supportingcomponents/empty-orders/empty-orders.component';
import { ProfileAddressComponent } from './profile-address/profile-address.component';

const routes: Routes = [{ path:'signin-signup',component:EnterNoComponent},
{path:'add-cart',component:AddCartComponent,canActivate: [AuthGuard]},
{path:'categories',component:CategoriesComponent},
{path:'category-page',component:CategoryPageComponent},
{path:'in/:username',component:HomeComponent},
{path:'checkout',component:CheckoutComponent,canActivate: [AuthGuard]},
{path:'empty-cart',component:EmptyCartComponent,canActivate: [AuthGuard]},
{path:'order-details',component:OrderDetailsComponent,canActivate: [AuthGuard]},
{path:'order-placed',component:OrderPlacedComponent,canActivate: [AuthGuard]},
{path:'order',component:OrderComponent,canActivate: [AuthGuard]},
{path:'product-details',component:ProductDetailsComponent},
{path:'profile',component:ProfileComponent,canActivate: [AuthGuard]},
{path:'products',component:SubCategoriesPopupComponent},
{path:'searched-results',component:SearchedProductComponent},
{path:'otp',component:OtpComponent},
{path:'address',component:AddressPageComponent, canActivate:[AuthGuard]},
{path:'new-address',component:NewAddressComponent,canActivate:[AuthGuard]},
{path:'',component:DhandaLandingComponent},
{path:'privacy',component:PrivacyPolicyComponent},
{path:'terms',component:TermsAndConditionsComponent},
{path:'empty-product',component:EmptyProductsComponent,canActivate: [AuthGuard]},
{path:'empty-category',component:EmptyCategoryComponent,canActivate: [AuthGuard]},
{path:'empty-subcategory',component:EmptySubCategoryComponent,canActivate: [AuthGuard]},
{path:'empty-orders',component:EmptyOrdersComponent,canActivate: [AuthGuard]},
{path:'profile-address',component:ProfileAddressComponent,canActivate: [AuthGuard]},
{ path:'**',redirectTo:'',pathMatch: 'full'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
