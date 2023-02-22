import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTracktimeComponent } from './edit-tracktime.component';

describe('EditTracktimeComponent', () => {
  let component: EditTracktimeComponent;
  let fixture: ComponentFixture<EditTracktimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTracktimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTracktimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
