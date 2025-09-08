import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { RecipeService } from '../../../services/recipe.service';
import { RecipeEstacionPorcentaje } from '../../../models/recipes';

@Component({
  selector: 'app-metric-estaciones',
  standalone: false,
  templateUrl: './metric-estaciones.component.html',
  styleUrl: './metric-estaciones.component.css',
})
export class MetricEstacionesComponent {
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData: ChartData<`doughnut`> = {
    labels: ['Primavera', 'Verano', 'Invierno', 'Otoño', 'todo el año'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#42A5F5',
          '#66BB6A',
          '#FFA726',
          '#EF5350',
          '#AB47BC',
        ],
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

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService
      .getEstacionesPorcentaje()
      .subscribe((data: RecipeEstacionPorcentaje[]) => {
        const categoriaMap = new Map<string, number>();
        data.forEach((item) => {
          categoriaMap.set(
            item.estacion.toLowerCase(),
            Number(item.porcentaje)
          );
        });

        this.doughnutChartData = {
          labels: ['Primavera', 'Verano', 'Invierno', 'Otoño', 'todo el año'],
          datasets: [
            {
              data: [
                categoriaMap.get('primavera') || 0,
                categoriaMap.get('verano') || 0,
                categoriaMap.get('invierno') || 0,
                categoriaMap.get('otoño') || 0,
                categoriaMap.get('todo el año') || 0,
              ],
              backgroundColor: [
                '#42A5F5',
                '#66BB6A',
                '#FFA726',
                '#EF5350',
                '#AB47BC',
              ],
            },
          ],
        };
      });
  }
}
