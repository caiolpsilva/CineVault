import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicial } from './home.page';

describe('PaginaInicial', () => {
  let component: PaginaInicial;
  let fixture: ComponentFixture<PaginaInicial>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(PaginaInicial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
