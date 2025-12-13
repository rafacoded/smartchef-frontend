import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListasCompraPage } from './listas-compra.page';

describe('ListasCompraPage', () => {
  let component: ListasCompraPage;
  let fixture: ComponentFixture<ListasCompraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
