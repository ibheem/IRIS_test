import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CdkTableModule} from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
// import { MatSelectModule } from '@angular/material/select';
import { MatSortModule  } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { RecordsComponent } from './records/records.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    MatDividerModule,
    CdkTableModule,
    CdkTreeModule,
    MatTableModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    // MatListModule,
    MatRippleModule,
    // MatSelectModule,
    MatSortModule,
    MatTreeModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
