import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricRecetasComponent } from './metric-recetas.component';

describe('MetricRecetasComponent', () => {
  let component: MetricRecetasComponent;
  let fixture: ComponentFixture<MetricRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricRecetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
