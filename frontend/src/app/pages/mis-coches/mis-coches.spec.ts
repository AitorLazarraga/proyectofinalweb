import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisCoches } from './mis-coches';

describe('MisCoches', () => {
  let component: MisCoches;
  let fixture: ComponentFixture<MisCoches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisCoches],
    }).compileComponents();

    fixture = TestBed.createComponent(MisCoches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
