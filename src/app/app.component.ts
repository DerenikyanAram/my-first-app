import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgFor, NgIf, NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, NgIf, NgFor, RouterLink, HeaderComponent, HeaderComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ra';
}
