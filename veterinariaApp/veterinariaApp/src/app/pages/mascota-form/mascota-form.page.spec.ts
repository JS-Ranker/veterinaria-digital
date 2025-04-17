import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascotaFormPage } from './mascota-form.page';

describe('MascotaFormPage', () => {
  let component: MascotaFormPage;
  let fixture: ComponentFixture<MascotaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
