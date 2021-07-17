import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask: boolean;
  subcription: Subscription;

  constructor(private toggleService: ToggleService) {
    this.subcription = this.toggleService.onToggle().subscribe((value) => {
      this.showAddTask = value;
    });
  }

  ngOnInit(): void {}

  onToggleAdd(): void {
    this.toggleService.toggle();
  }
}
