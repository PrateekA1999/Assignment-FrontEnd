import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompoundModule } from './compound/compound.module';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { FileUploadComponent } from './dialog/file-upload/file-upload.component';
import { CompoundInputComponent } from './dialog/compound-input/compound-input.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    FileUploadComponent,
    CompoundInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CompoundModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
