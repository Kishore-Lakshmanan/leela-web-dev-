import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { CounterComponent } from './counter/counter/counter.component';
import { CustomCounterInputComponent } from './counter/custom-counter-input/custom-counter-input.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { appReducer } from './store/app.state';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
    HomeComponent,
    HeaderComponent,
    PostsListComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }), // Enable only in dev mode
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
