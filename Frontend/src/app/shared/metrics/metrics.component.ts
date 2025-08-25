import { Component } from '@angular/core';

@Component({
  selector: 'app-metrics',
  standalone: false,
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.css'
})
export class MetricsComponent {


selectedMetric: string = '';


selectMetric(metric: string){

  this.selectedMetric = metric;
}



}
