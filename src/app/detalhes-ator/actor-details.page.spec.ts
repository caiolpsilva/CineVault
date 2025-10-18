import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActorDetailsPage } from './actor-details.page';

describe('ActorDetailsPage', () => {
  let component: ActorDetailsPage;
  let fixture: ComponentFixture<ActorDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
