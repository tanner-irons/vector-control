import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessBlockComponent } from './process-block.component';

describe('ProcessComponent', () => {
  let component: ProcessBlockComponent;
  let fixture: ComponentFixture<ProcessBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
