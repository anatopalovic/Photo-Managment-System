import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlikaComponent } from './slika.component';

describe('SlikaComponent', () => {
  let component: SlikaComponent;
  let fixture: ComponentFixture<SlikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
