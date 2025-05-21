import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideollamadaPage } from './videollamada.page';

describe('VideollamadaPage', () => {
  let component: VideollamadaPage;
  let fixture: ComponentFixture<VideollamadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideollamadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
