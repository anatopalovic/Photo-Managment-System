import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumMrezaComponent } from './album-mreza.component';

describe('AlbumMrezaComponent', () => {
  let component: AlbumMrezaComponent;
  let fixture: ComponentFixture<AlbumMrezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumMrezaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumMrezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
