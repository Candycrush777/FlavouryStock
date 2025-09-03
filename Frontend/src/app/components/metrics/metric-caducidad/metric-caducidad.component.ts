import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { EtiquetaService } from '../../../services/etiqueta.service';
import { CaducidadPorcentajes } from '../../../models/etiqueta';

@Component({
  selector: 'app-metric-caducidad',
  standalone: false,
  templateUrl: './metric-caducidad.component.html',
  styleUrl: './metric-caducidad.component.css',
})
export class MetricCaducidadComponent implements OnInit {
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Caducado', 'Caduca Pronto', 'Vigente'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#4CAF50', '#FFEB3B', '#F44336'],
      },
    ],
  };

  public chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset =
              this.doughnutChartData.datasets[tooltipItem.datasetIndex!];
            const value = dataset.data[tooltipItem.dataIndex!];
            const label =
              this.doughnutChartData.labels![tooltipItem.dataIndex!] || '';
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  constructor(private etiquetasService: EtiquetaService) {}

  ngOnInit(): void {
    this.etiquetasService
      .getCaducidadesPorcentajes()
      .subscribe((data: CaducidadPorcentajes) => {
        this.doughnutChartData = {
          labels: ['Vigente', 'Caduca Pronto','Caducado'],
          datasets: [
            {
              data: [
                Number(data.caducado),
                Number(data.caducaPronto),
                Number(data.vigente),
              ],
              backgroundColor: ['#4CAF50', '#FFEB3B', '#F44336']
            },
          ],
        };
      });
  }
}
