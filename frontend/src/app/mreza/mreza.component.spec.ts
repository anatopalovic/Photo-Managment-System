import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrezaComponent } from './mreza.component';

describe('MrezaComponent', () => {
  let component: MrezaComponent;
  let fixture: ComponentFixture<MrezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrezaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
