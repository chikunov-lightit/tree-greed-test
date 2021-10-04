import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {TreeGridTestModule} from './tree-grid/tree-grid-test.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridTestModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
