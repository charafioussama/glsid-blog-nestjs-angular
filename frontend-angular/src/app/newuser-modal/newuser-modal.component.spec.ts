import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserModalComponent } from './newuser-modal.component';

describe('NewuserModalComponent', () => {
  let component: NewuserModalComponent;
  let fixture: ComponentFixture<NewuserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewuserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
