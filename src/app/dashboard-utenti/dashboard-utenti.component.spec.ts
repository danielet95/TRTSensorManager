import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUtentiComponent } from './dashboard-utenti.component';

describe('DashboardUtentiComponent', () => {
  let component: DashboardUtentiComponent;
  let fixture: ComponentFixture<DashboardUtentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUtentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
