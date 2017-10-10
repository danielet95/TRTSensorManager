import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoriUtentiComponent } from './sensori-utenti.component';

describe('SensoriUtentiComponent', () => {
  let component: SensoriUtentiComponent;
  let fixture: ComponentFixture<SensoriUtentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensoriUtentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensoriUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
