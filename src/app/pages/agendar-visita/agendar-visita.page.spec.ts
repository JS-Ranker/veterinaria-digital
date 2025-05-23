import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendarVisitaPage } from './agendar-visita.page';

describe('AgendarVisitaPage', () => {
  let component: AgendarVisitaPage;
  let fixture: ComponentFixture<AgendarVisitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarVisitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
