import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMedicoVisualComponent } from './reporte-medico-visual.component';

describe('ReporteMedicoVisualComponent', () => {
  let component: ReporteMedicoVisualComponent;
  let fixture: ComponentFixture<ReporteMedicoVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteMedicoVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMedicoVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
