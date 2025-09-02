import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { StockageService } from '../../../services/stockage.service';
import { StockagePorcentajes } from '../../../models/stockageView';

@Component({
  selector: 'app-metric-stock',
  standalone:false,
  templateUrl: './metric-stock.component.html',
  styleUrls: ['./metric-stock.component.css']
})
export class MetricStockComponent implements OnInit {

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Almacén', 'Nevera', 'Congelador'],
    datasets: [
      {
        data: [], // vacío inicialmente
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }
    ]
  };

  public chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = this.doughnutChartData.datasets[tooltipItem.datasetIndex!];
            const value = dataset.data[tooltipItem.dataIndex!];
            const label = this.doughnutChartData.labels![tooltipItem.dataIndex!] || '';
            return `${label}: ${value}%`;
          }
        }
      }
    }
  };

  constructor(private stockageService: StockageService) {}

  ngOnInit(): void {
    this.stockageService.getStockagePorcentajes().subscribe((data: StockagePorcentajes) => {
      // Creamos un nuevo objeto para que ng2-charts detecte el cambio
      this.doughnutChartData = {
        labels: ['Almacén', 'Nevera', 'Congelador'],
        datasets: [
          {
            data: [
              Number(data.porcentaje_almacen),
              Number(data.porcentaje_nevera),
              Number(data.porcentaje_congelador)
            ],
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
          }
        ]
      };
    });
  }
}



