import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndocrinologiaPage } from './endocrinologia.page';

describe('EndocrinologiaPage', () => {
  let component: EndocrinologiaPage;
  let fixture: ComponentFixture<EndocrinologiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EndocrinologiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
