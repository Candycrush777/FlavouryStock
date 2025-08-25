import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-metric-stock',
  standalone:false,
  templateUrl: './metric-stock.component.html',
  styleUrls: ['./metric-stock.component.css']
})
export class MetricStockComponent {

  // Aquí especificamos el tipo exacto
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Almacén', 'Nevera', 'Congelador'],
    datasets: [
      {
        data: [746, 182, 84],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }
    ]
  };

  public chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false
  };

}



