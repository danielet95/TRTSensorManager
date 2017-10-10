import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloUtentiComponent } from './profilo-utenti.component';

describe('ProfiloUtentiComponent', () => {
  let component: ProfiloUtentiComponent;
  let fixture: ComponentFixture<ProfiloUtentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiloUtentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiloUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
