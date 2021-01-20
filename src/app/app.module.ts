import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './rountingcomponent/home/home.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { EnterNoComponent } from './enter-no/enter-no.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { OrderComponent } from './order/order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';
import { SubCategoriesPopupComponent } from './sub-categories-popup/sub-categories-popup.component';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from  'ng-otp-input';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthService } from './_api/auth.service';
import { SupportService } from './_api/support.service';
import { AuthInterceptorService } from './_api/authinterceptor.service';
import { FooterComponent } from './supportingcomponents/footer/footer.component'
import {CategoryService} from './_api/category.service'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchedProductComponent } from './routingcomponent/searched-product/searched-product.component';
import { AddressPageComponent } from './address-page/address-page.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { DhandaLandingComponent } from './dhanda-landing/dhanda-landing.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { EmptyCategoryComponent } from './supportingcomponents/empty-category/empty-category.component';
import { EmptyProductsComponent } from './supportingcomponents/empty-products/empty-products.component';
import { EmptySubCategoryComponent } from './supportingcomponents/empty-sub-category/empty-sub-category.component';
import { EmptyOrdersComponent } from './supportingcomponents/empty-orders/empty-orders.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CountdownModule } from 'ngx-countdown';
declare const $: any;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCartComponent,
    CategoriesComponent,
    CategoryPageComponent,
    EnterNoComponent,
    CheckoutComponent,
    EmptyCartComponent,
    OrderDetailsComponent,
    OrderPlacedComponent,
    OrderComponent,
    ProductDetailsComponent,
    ProfileComponent,
    SubCategoriesPopupComponent,
    OtpComponent,
    CounterInputComponent,
    CustomModalComponent,
    FooterComponent,
    SearchedProductComponent,
    AddressPageComponent,
    NewAddressComponent,
    DhandaLandingComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    EmptyCategoryComponent,
    EmptyProductsComponent,
    EmptySubCategoryComponent,
    EmptyOrdersComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    NgOtpInputModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    SlickCarouselModule,
    CountdownModule
  ],
  entryComponents:[CustomModalComponent],
  providers: [AuthService,CategoryService,SupportService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
