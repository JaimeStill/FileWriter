import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Services } from './services';
import { Pipes } from './pipes';

@NgModule({
  providers: [
    [...Services]
  ],
  declarations: [
    [...Pipes]
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    [...Pipes],
    HttpClientModule
  ]
})
export class ServicesModule { }
