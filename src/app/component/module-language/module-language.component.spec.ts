import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleLanguageComponent } from './module-language.component';

describe('ModuleLanguageComponent', () => {
  let component: ModuleLanguageComponent;
  let fixture: ComponentFixture<ModuleLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
