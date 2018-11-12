import { Component } from '@angular/core';
import { routes } from './app-routing.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // links = ['First', 'Second', 'Third'];
  // activeLink = this.links[0];
  // background = '';
  
  // LATEST:
  // navLinks = [
  //   { path: 'app-coworkers', label: 'CoWorkers1', link: './coworkers.component.html' },
  //   { path: 'app-coworkers', label: 'CoWorkers2' },
  //   { path: 'the-game', label: 'The Game' },
  //   { path: 'probability-calculator', label: 'Probability calculator' },
  // ];

  // public tabRoutes = routes.filter(r => r.path === 'tabs')
  //   .map(({ children }) => children)
  //   .reduce((acc, curr) => [...acc, ...curr], [])
  //   .filter(({ path }) => !!path);
  title = 'myShift';
}
