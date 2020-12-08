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

    
  ],
  entryComponents:[CustomModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
