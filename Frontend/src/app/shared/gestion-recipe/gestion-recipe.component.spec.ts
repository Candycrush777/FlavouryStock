import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRecipeComponent } from './gestion-recipe.component';

describe('GestionRecipeComponent', () => {
  let component: GestionRecipeComponent;
  let fixture: ComponentFixture<GestionRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionRecipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
