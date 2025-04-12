import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipoPage } from './equipo.page';

describe('EquipoPage', () => {
  let component: EquipoPage;
  let fixture: ComponentFixture<EquipoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
