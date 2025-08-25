import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricCaducidadComponent } from './metric-caducidad.component';

describe('MetricCaducidadComponent', () => {
  let component: MetricCaducidadComponent;
  let fixture: ComponentFixture<MetricCaducidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricCaducidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricCaducidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
