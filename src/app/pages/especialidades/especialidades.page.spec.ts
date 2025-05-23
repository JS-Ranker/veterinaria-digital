import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspecialidadesPage } from './especialidades.page';

describe('EspecialidadesPage', () => {
  let component: EspecialidadesPage;
  let fixture: ComponentFixture<EspecialidadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
