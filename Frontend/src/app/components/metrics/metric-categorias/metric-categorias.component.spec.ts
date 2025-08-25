import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricCategoriasComponent } from './metric-categorias.component';

describe('MetricCategoriasComponent', () => {
  let component: MetricCategoriasComponent;
  let fixture: ComponentFixture<MetricCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
