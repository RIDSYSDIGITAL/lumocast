import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-control-center-section',
  templateUrl: './control-center-section.component.html',
  styleUrls: ['./control-center-section.component.scss']
})
export class ControlCenterSectionComponent {
  @Input() image = '';
  @Input() appLink = '';
}
