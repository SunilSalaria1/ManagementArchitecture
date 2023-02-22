import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTracktimeComponent } from './view-tracktime.component';

describe('ViewTracktimeComponent', () => {
  let component: ViewTracktimeComponent;
  let fixture: ComponentFixture<ViewTracktimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTracktimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTracktimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
