import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideRecipesComponent } from './slide-recipes.component';

describe('SlideRecipesComponent', () => {
  let component: SlideRecipesComponent;
  let fixture: ComponentFixture<SlideRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
