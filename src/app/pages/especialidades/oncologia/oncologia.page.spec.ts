import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OncologiaPage } from './oncologia.page';

describe('OncologiaPage', () => {
  let component: OncologiaPage;
  let fixture: ComponentFixture<OncologiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OncologiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
