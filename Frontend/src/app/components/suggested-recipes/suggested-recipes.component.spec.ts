import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedRecipesComponent } from './suggested-recipes.component';

describe('SuggestedRecipesComponent', () => {
  let component: SuggestedRecipesComponent;
  let fixture: ComponentFixture<SuggestedRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestedRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
