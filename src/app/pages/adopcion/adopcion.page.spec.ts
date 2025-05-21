import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdopcionPage } from './adopcion.page';

describe('AdopcionPage', () => {
  let component: AdopcionPage;
  let fixture: ComponentFixture<AdopcionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
