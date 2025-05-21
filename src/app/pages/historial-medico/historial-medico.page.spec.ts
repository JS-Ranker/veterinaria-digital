import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialMedicoPage } from './historial-medico.page';

describe('HistorialMedicoPage', () => {
  let component: HistorialMedicoPage;
  let fixture: ComponentFixture<HistorialMedicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialMedicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
