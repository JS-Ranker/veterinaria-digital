import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardiologiaPage } from './cardiologia.page';

describe('CardiologiaPage', () => {
  let component: CardiologiaPage;
  let fixture: ComponentFixture<CardiologiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardiologiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
