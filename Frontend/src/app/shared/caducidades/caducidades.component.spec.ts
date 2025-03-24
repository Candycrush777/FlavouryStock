import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaducidadesComponent } from './caducidades.component';

describe('CaducidadesComponent', () => {
  let component: CaducidadesComponent;
  let fixture: ComponentFixture<CaducidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaducidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaducidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
