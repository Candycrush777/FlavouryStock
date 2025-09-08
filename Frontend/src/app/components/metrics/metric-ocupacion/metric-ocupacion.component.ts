import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { IngredientService } from '../../../services/ingredient.service';
import { IngredientsPorcentaje } from '../../../models/ingredients';

@Component({
  selector: 'app-metric-ocupacion',
  standalone: false,
  templateUrl: './metric-ocupacion.component.html',
  styleUrl: './metric-ocupacion.component.css'
})
export class MetricOcupacionComponent {
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Almacén', 'Nevera', 'Congelador'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
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
            const dataset = this.doughnutChartData.datasets[tooltipItem.datasetIndex!];
            const value = dataset.data[tooltipItem.dataIndex!];
            const label = this.doughnutChartData.labels![tooltipItem.dataIndex!] || '';
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.ingredientService.getObtenerOcupacionPorcentajes().subscribe((data) => {
      const lugarMap = new Map<string, number>();
      data.forEach((item) => {
        // Convertimos a número por si viene string
        lugarMap.set(item.lugar_almacen.toLowerCase(), Number(item.porcentaje_ocupacion));
      });

      this.doughnutChartData = {
        labels: ['Almacén', 'Nevera', 'Congelador'],
        datasets: [
          {
            data: [
              lugarMap.get('almacen') || 0,
              lugarMap.get('nevera') || 0,
              lugarMap.get('congelador') || 0,
            ],
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          },
        ],
      };
    });
  }
}

