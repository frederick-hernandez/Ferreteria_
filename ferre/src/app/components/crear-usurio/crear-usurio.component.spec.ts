import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsurioComponent } from './crear-usurio.component';

describe('CrearUsurioComponent', () => {
  let component: CrearUsurioComponent;
  let fixture: ComponentFixture<CrearUsurioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearUsurioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUsurioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
