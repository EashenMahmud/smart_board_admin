import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleListComponent } from './title-list.component';

describe('TitleListComponent', () => {
  let component: TitleListComponent;
  let fixture: ComponentFixture<TitleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleListComponent]
    });
    fixture = TestBed.createComponent(TitleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
