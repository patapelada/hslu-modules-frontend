import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRequirementComponent } from './module-requirement.component';

describe('ModuleRequirementComponent', () => {
  let component: ModuleRequirementComponent;
  let fixture: ComponentFixture<ModuleRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
