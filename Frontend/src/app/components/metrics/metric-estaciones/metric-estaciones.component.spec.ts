import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricEstacionesComponent } from './metric-estaciones.component';

describe('MetricEstacionesComponent', () => {
  let component: MetricEstacionesComponent;
  let fixture: ComponentFixture<MetricEstacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricEstacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricEstacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
