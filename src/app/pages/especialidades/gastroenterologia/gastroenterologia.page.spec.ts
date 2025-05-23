import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GastroenterologiaPage } from './gastroenterologia.page';

describe('GastroenterologiaPage', () => {
  let component: GastroenterologiaPage;
  let fixture: ComponentFixture<GastroenterologiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GastroenterologiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
