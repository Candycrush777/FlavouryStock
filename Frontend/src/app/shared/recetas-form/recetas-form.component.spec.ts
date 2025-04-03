import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasFormComponent } from './recetas-form.component';

describe('RecetasFormComponent', () => {
  let component: RecetasFormComponent;
  let fixture: ComponentFixture<RecetasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecetasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
