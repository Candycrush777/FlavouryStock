import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { RecipeService } from '../../../services/recipe.service';
import { RecipeCategoriaPorcentaje } from '../../../models/recipes';

@Component({
  selector: 'app-metric-recetas',
  standalone: false,
  templateUrl: './metric-recetas.component.html',
  styleUrl: './metric-recetas.component.css',
})
export class MetricRecetasComponent implements OnInit {
  

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData: ChartData<`doughnut`> = {
    labels: ['Desayuno', 'Comida', 'Cena', 'Postre', 'Vegano'],
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

  constructor(private recipeService:RecipeService){}

ngOnInit(): void {
  this.recipeService.getRecipePorcentajes().subscribe((data: RecipeCategoriaPorcentaje[]) => {
    // Crear un mapa para acceso fácil por categoría
    const categoriaMap = new Map<string, number>();
    data.forEach(item => {
      categoriaMap.set(item.categoria.toLowerCase(), item.porcentaje);
    });

    this.doughnutChartData = {
      labels: ['Desayuno', 'Comida', 'Cena', 'Postre', 'Vegano'],
      datasets: [{
        data: [
          categoriaMap.get('desayuno') || 0,
          categoriaMap.get('comida') || 0,
          categoriaMap.get('cena') || 0,
          categoriaMap.get('postre') || 0,
          categoriaMap.get('vegano') || 0
        ],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350', '#AB47BC']
      }]
    };
  });
}
}
