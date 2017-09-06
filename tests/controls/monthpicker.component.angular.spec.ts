
// import { ComponentFixture, TestBed, async } from "@angular/core/testing";
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
// import { By } from "@angular/platform-browser";
// import { DebugElement } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { FormsModule } from "@angular/forms";

// import { MonthpickerComponent } from "../../component-package/controls/monthpicker/monthpicker.component";


// describe("[MonthpickerComponent]", () => {
//     let component: MonthpickerComponent;
//     let fixture: ComponentFixture<MonthpickerComponent>;
//     let rootElement: DebugElement;

//     beforeEach((done) => {
//         TestBed.resetTestEnvironment();
//         TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//         TestBed.configureTestingModule({
//             declarations: [MonthpickerComponent],
//             imports: [CommonModule, FormsModule]
//         });

//         TestBed.overrideComponent(MonthpickerComponent, {
//             set: {
//                 templateUrl: "monthpicker.component.html"
//             }
//         });

//         TestBed.compileComponents().then(() => {
//             fixture = TestBed.createComponent(MonthpickerComponent);
//             component = fixture.componentInstance;
//             rootElement = fixture.debugElement;

//             fixture.detectChanges();

//             done();
//         });
//     });
//     describe("When initialized with default settings", () => {
//         beforeAll(() => {
//             component.ngOnInit();
//         });

//         it("contains the current year", () => {
//             expect(component.years.map(x => x.year)).toEqual([new Date().getFullYear()]);
//         });
//         it("the current year contains 12 months", () => {
//             expect(component.years[0].months.map(x => x.displayName)).toBe(['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']);
//         });
//         it("the current month is set", () => {
//             // var actualCurrentMonth = new Date().getMonth();
//             // var currentMonth = component.years[0].months.filter(x => x.date.getMonth() === actualCurrentMonth)[0];

//             // expect(currentMonth.isCurrentMonth).toBe(true);
//         });
//         it('dropdown text is Välj månad', () => {

//         });
//     });
// });
