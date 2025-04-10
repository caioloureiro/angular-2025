import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudComponent } from './crud/crud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
	CrudComponent,
	FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-2025';
}
