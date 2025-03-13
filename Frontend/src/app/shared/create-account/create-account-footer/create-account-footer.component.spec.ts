import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountFooterComponent } from './create-account-footer.component';

describe('CreateAccountFooterComponent', () => {
  let component: CreateAccountFooterComponent;
  let fixture: ComponentFixture<CreateAccountFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
