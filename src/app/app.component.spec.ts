import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {
    // Arrange
    const num1 = 1;
    const num2 = 2;
    // Act
    const result = num1 + num2;
    // Assert
    expect(result).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render RouterOutlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css class', () => {
    const divElement = compiled.querySelector('div');
    const cssClass =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );
    expect(divElement).not.toBeNull();
    divElement?.classList.forEach((className) => {
      expect(cssClass).toContain(className);
    });
  });

  it("should contain the 'buy me a beer' link ", () => {
    const linkElement = compiled.querySelector('a');
    expect(linkElement).not.toBeNull();
    expect(linkElement?.title).toEqual('Buy me a beer');
    expect(linkElement?.href).toContain('https://www.buymeacoffee.com/');
  });
});
