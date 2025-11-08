import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaDetalhesAtor } from './detalhes-ator.page';

describe('PaginaDetalhesAtor', () => {
  let component: PaginaDetalhesAtor;
  let fixture: ComponentFixture<PaginaDetalhesAtor>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDetalhesAtor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
