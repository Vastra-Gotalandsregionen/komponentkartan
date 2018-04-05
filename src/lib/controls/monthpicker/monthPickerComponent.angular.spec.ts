import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthpickerComponent } from '../../controls/monthpicker/monthpicker.component';
import { TruncatePipe } from '../../pipes/truncatePipe';


describe('[MonthpickerComponent(Angular)]', () => {
  let component: MonthpickerComponent;
  let fixture: ComponentFixture<MonthpickerComponent>;
  let rootElement: DebugElement;
  //let monthpicker: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [MonthpickerComponent, TruncatePipe],
      imports: [CommonModule]
    });

    TestBed.overrideComponent(MonthpickerComponent, {
      set: {
        templateUrl: './monthpicker.component.html'
      }
    });


    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(MonthpickerComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      // monthpicker = rootElement.query(By.css('.monthpicker'));
      fixture.detectChanges();

      done();
    });
  });

  describe('When in monthpicker and nextmonth is clicked', () => {
    beforeEach(() => {
      const nextMonth = fixture.debugElement.query(By.css('.monthpicker__calendar__header__next-year'));
      spyOn(component, 'onLeave');
      spyOn(component, 'onNextMouseDown');
      nextMonth.triggerEventHandler('mousedown', event);
    });

    it('onNextMouseDown function has been called', () => {
      expect(component.onNextMouseDown).toHaveBeenCalled();
    });

    it('onLeave event is not triggered', () => {
      expect(component.onLeave).not.toHaveBeenCalled();
    });
  });

  describe('When in monthpicker is clicked outside - focusedout', () => {
    beforeEach(() => {
      const nextMonth = fixture.debugElement.query(By.css('.monthpicker'));
      spyOn(component, 'onLeave');
      nextMonth.triggerEventHandler('focusout', event);
    });

    it('onLeave event is triggered', () => {
      expect(component.onLeave).toHaveBeenCalled();
    });
  });

  describe('When initialized with empty Selected date and readonly-mode', () => {
    beforeEach(() => {
      component.readonly = true;
      fixture.detectChanges();
    });

    it('has div class .readonly', () => {
      expect(fixture.debugElement.classes['readonly']).toBe(true);
    });

    it('selected date is empty', () => {
      const selectedMonthSpan = fixture.debugElement.query(By.css('.monthpicker__dropdown span'));
      const content = selectedMonthSpan.nativeElement.textContent;
      expect(content.trim()).toBe('');
    });
  });

  describe('When initialized with existing Selected date and readonly-mode', () => {
    beforeEach(() => {
      component.selectedDate = new Date(2017, 1, 1);
      component.readonly = true;
      component.selectedDateFormat = 'MM';
      fixture.detectChanges();
    });

    it('has div class .readonly', () => {
      expect(fixture.debugElement.classes['readonly']).toBe(true);
    });

    it('selected date is new Date(2017,1,1) and displayed on format MM', () => {
      const selectedMonthSpan = fixture.debugElement.query(By.css('.monthpicker__dropdown span'));
      const content = selectedMonthSpan.nativeElement.textContent;
      expect(content.trim()).toBe('02');
    });
  });

  describe('When initialized with readonly-mode set to false', () => {
    beforeEach(() => {
      component.readonly = false;
      fixture.detectChanges();
    });

    it('does not have div class .readonly', () => {
      expect(fixture.debugElement.classes['readonly']).toBe(false);
    });
  });

  describe('When initialized with existing Selected date and disabled-mode', () => {
    beforeEach(() => {
      component.selectedDate = new Date(2017, 1, 1);
      component.disabled = true;
      component.selectedDateFormat = 'MM';
      fixture.detectChanges();
    });

    it('has div class .readonly', () => {
      expect(fixture.debugElement.classes['disabled']).toBe(true);
    });

    it('selected date is new Date(2017,1,1) and displayed on format MM', () => {
      const selectedMonthSpan = fixture.debugElement.query(By.css('.monthpicker__dropdown span'));
      const content = selectedMonthSpan.nativeElement.textContent;
      expect(content.trim()).toBe('02');
    });
  });

  describe('When initialized with empty Selected date and disabled-mode', () => {
    beforeEach(() => {
      component.disabled = true;
      fixture.detectChanges();
    });

    it('has div class .readonly', () => {
      expect(fixture.debugElement.classes['disabled']).toBe(true);
    });

    it('selected date is empty', () => {
      const selectedMonthSpan = fixture.debugElement.query(By.css('.monthpicker__dropdown span'));
      const content = selectedMonthSpan.nativeElement.textContent;
      expect(content.trim()).toBe('Välj månad');
    });
  });

  describe('When initialized with disabled-mode set to false', () => {
    beforeEach(() => {
      component.disabled = false;
      fixture.detectChanges();
    });

    it('does not have div class .readonly', () => {
      expect(fixture.debugElement.classes['readonly']).toBe(false);
    });
  });

  describe('WCAG Tests', () => {
    let monthpicker: DebugElement;
    let listElement: DebugElement;
    beforeEach(() => {
      monthpicker = rootElement.query(By.css('.monthpicker'));

      fixture.detectChanges();
    });

    it('aria-expanded is false', () => {
      expect(monthpicker.attributes['aria-expanded']).toBe('false');
    });
    it('aria-disabled is false', () => {
      expect(monthpicker.attributes['aria-disabled']).toBe('false');
    });
    it('tabindex to be 0', () => {
      expect(monthpicker.attributes['tabindex']).toBe('0');
    });
    it('areia-labelledby is set to', () => {
      expect(monthpicker.attributes['aria-labelledby']).toBe(component.labelledbyid);
    });

    describe('monthpicker is initialized with two years', () => {
      let listItems;
      let months: DebugElement[];
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth();
      let currentYearElement;
      let nextYearElement;
      beforeEach(() => {
        component.expanded = false;

        component.minDate = new Date(2015, 5, 1);
        component.maxDate = new Date(currentYear, 11, 31);

        component.ngOnInit();

        fixture.detectChanges();

        component.ngOnChanges(null);

        nextYearElement = fixture.debugElement.query(By.css('.monthpicker__calendar__header__next-year'));

        listElement = rootElement.query(By.css('.monthpicker__calendar'));
        months = rootElement.queryAll(By.css('.monthpicker__calendar__month'));
        currentYearElement = rootElement.query(By.css('.monthpicker__calendar__header__year'));
      });

      it('focusableMonths is set', () => {
        expect(component.focusableMonths.length).toBe(12);
      });
      it('current year is in view', () => {
        expect(currentYearElement.nativeElement.innerText).toBe(currentYear.toString());
      });

      it('12 months is in view', () => {
        expect(months.length).toBe(12);
      });
      it('the months in view has the [attr.aria-selected] set to false', () => {
        expect(months.filter(m => m.attributes['aria-selected'] === 'false').length).toBe(12);
      });

      it('next year is disabled and has aria-disabled', () => {
        expect(nextYearElement.classes['disabled']).toBe(true);
        expect(nextYearElement.attributes['aria-disabled']).toBe('true');
      })

      it('next year has role button', () => {
        expect(nextYearElement.attributes['role']).toBe('button');
      })

      it('the months has role set to gridcell', () => {
        expect(months.filter(m => m.attributes['role'] === 'gridcell').length).toEqual(12);
      })

      it('the months has aria-labels set to name of month and year', () => {
        expect(months[0].attributes['aria-label']).toBe('Januari ' + currentYear);
        expect(months[1].attributes['aria-label']).toBe('Februari ' + currentYear);
        expect(months[2].attributes['aria-label']).toBe('Mars ' + currentYear);
        expect(months[3].attributes['aria-label']).toBe('April ' + currentYear);
        expect(months[4].attributes['aria-label']).toBe('Maj ' + currentYear);
        expect(months[5].attributes['aria-label']).toBe('Juni ' + currentYear);
        expect(months[6].attributes['aria-label']).toBe('Juli ' + currentYear);
        expect(months[7].attributes['aria-label']).toBe('Augusti ' + currentYear);
        expect(months[8].attributes['aria-label']).toBe('September ' + currentYear);
        expect(months[9].attributes['aria-label']).toBe('Oktober ' + currentYear);
        expect(months[10].attributes['aria-label']).toBe('November ' + currentYear);
        expect(months[11].attributes['aria-label']).toBe('December ' + currentYear);
      })

      describe('enter is pressed', () => {
        beforeEach(() => {
          monthpicker.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
          fixture.detectChanges();
        });
        it('monthpicker is expanded', () => {
          expect(component.expanded).toBe(true);
        });
        it('attr.aria-expanded is true', () => {
          expect(monthpicker.attributes['aria-expanded']).toBe('true');
        });

        it('current month has focus', () => {
          let focusedElement = rootElement.query(By.css(':focus'));
          expect(focusedElement.nativeElement.innerText).toBe(component.getMonthName(currentMonth));
        });
        describe('and home is pressed', () => {
          beforeEach(() => {
            monthpicker.triggerEventHandler('keydown', { keyCode: 36, preventDefault: function () { } } as KeyboardEvent);
            fixture.detectChanges();
          });
          it('Jan has focus', () => {
            let focusedElement = rootElement.query(By.css(':focus'));
            expect(focusedElement.nativeElement.innerText).toBe('Jan');
          });
          describe('and space is pressed', () => {
            beforeEach(() => {
              months[0].triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
              monthpicker.triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
              fixture.detectChanges();
            });
            it('component is closed', () => {
              expect(component.expanded).toBe(false);
            });
            it('first month of the year is selected', () => {
              expect(component.selectedDate).toEqual(new Date(currentYear, 0, 1));
            });
            it('attr.aria-expanded is false', () => {
              expect(monthpicker.attributes['aria-expanded']).toBe('false');
            });
            describe('enter is pressed', () => {
              beforeEach(() => {
                jasmine.clock().uninstall();
                jasmine.clock().install();
                monthpicker.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
                fixture.detectChanges();
                jasmine.clock().tick(100);
              });
              it('first month of the year has focus', () => {
                let focusedElement = rootElement.query(By.css(':focus'));
                expect(focusedElement.nativeElement.innerText).toBe('Jan');
              });
            });
          })
          describe('arrow left is pressed', () => {
            beforeEach(() => {
              monthpicker.triggerEventHandler('keydown', { keyCode: 37, preventDefault: function () { } } as KeyboardEvent);
              fixture.detectChanges();
            });
            it('Dec has focus', () => {
              let focusedElement = rootElement.query(By.css(':focus'));
              expect(focusedElement.nativeElement.innerText).toBe('Dec');
            });
            it('previous year is in view', () => {
              expect(currentYearElement.nativeElement.innerText).toBe((currentYear - 1).toString());
            });

            describe('Arrow right is pressed', () => {
              beforeEach(() => {
                monthpicker.triggerEventHandler('keydown', { keyCode: 39, preventDefault: function () { } } as KeyboardEvent);
                fixture.detectChanges();
              });
              it('Jan has focus', () => {
                let focusedElement = rootElement.query(By.css(':focus'));
                expect(focusedElement.nativeElement.innerText).toBe('Jan');
              });
              it('current year is in view', () => {
                expect(currentYearElement.nativeElement.innerText).toBe(currentYear.toString());
              });
            })

          })
          describe('arrow right is pressed', () => {
            beforeEach(() => {
              monthpicker.triggerEventHandler('keydown', { keyCode: 39, preventDefault: function () { } } as KeyboardEvent);
              fixture.detectChanges();
            });
            it('Second item has focus (Feb)', () => {
              let focusedElement = rootElement.query(By.css(':focus'));
              expect(focusedElement.nativeElement.innerText).toBe('Feb');
            });
            it('current year is in view', () => {
              expect(currentYearElement.nativeElement.innerText).toBe(currentYear.toString());
            });
            describe('arrow up is pressed', () => {
              beforeEach(() => {
                monthpicker.triggerEventHandler('keydown', { keyCode: 38, preventDefault: function () { } } as KeyboardEvent);
                fixture.detectChanges();
              });
              it('Okt has focus', () => {
                let focusedElement = rootElement.query(By.css(':focus'));
                expect(focusedElement.nativeElement.innerText).toBe('Okt');
              });
              it('previous year is in view', () => {
                expect(currentYearElement.nativeElement.innerText).toBe((currentYear - 1).toString());
              });

              describe('arrow left is pressed twice', () => {
                beforeEach(() => {
                  monthpicker.triggerEventHandler('keydown', { keyCode: 37, preventDefault: function () { } } as KeyboardEvent);
                  monthpicker.triggerEventHandler('keydown', { keyCode: 37, preventDefault: function () { } } as KeyboardEvent);
                  fixture.detectChanges();
                });
                it('Aug has focus', () => {
                  let focusedElement = rootElement.query(By.css(':focus'));
                  expect(focusedElement.nativeElement.innerText).toBe('Aug');
                });
                it('previous year is in view', () => {
                  expect(currentYearElement.nativeElement.innerText).toBe((currentYear - 1).toString());
                });

                describe('arrow up is pressed ', () => {
                  beforeEach(() => {
                    monthpicker.triggerEventHandler('keydown', { keyCode: 38, preventDefault: function () { } } as KeyboardEvent);

                    fixture.detectChanges();
                  });
                  it('Apr has focus', () => {
                    let focusedElement = rootElement.query(By.css(':focus'));
                    expect(focusedElement.nativeElement.innerText).toBe('Apr');
                  });
                  it('previous year is in view', () => {
                    expect(currentYearElement.nativeElement.innerText).toBe((currentYear - 1).toString());
                  });
                });
                describe('arrow down is pressed twice', () => {
                  beforeEach(() => {
                    monthpicker.triggerEventHandler('keydown', { keyCode: 40, preventDefault: function () { } } as KeyboardEvent);
                    monthpicker.triggerEventHandler('keydown', { keyCode: 40, preventDefault: function () { } } as KeyboardEvent);
                    fixture.detectChanges();
                  });
                  it('Apr has focus', () => {
                    let focusedElement = rootElement.query(By.css(':focus'));
                    expect(focusedElement.nativeElement.innerText).toBe('Apr');
                  });
                  it('current year is in view', () => {
                    expect(currentYearElement.nativeElement.innerText).toBe(currentYear.toString());
                  });
                })
              })
            })
          })
        })
        describe('and end is pressed', () => {
          beforeEach(() => {
            monthpicker.triggerEventHandler('keydown', { keyCode: 35, preventDefault: function () { } } as KeyboardEvent);
            fixture.detectChanges();
          });
          it('Dec has focus', () => {
            let focusedElement = rootElement.query(By.css(':focus'));
            expect(focusedElement.nativeElement.innerText).toBe('Dec');
          });
          describe('and enter is pressed', () => {
            beforeEach(() => {
              months[11].triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
              monthpicker.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
              fixture.detectChanges();
            });
            it('component is closed', () => {
              expect(component.expanded).toBe(false);
            });
            it('last month of the year is selected', () => {
              expect(component.selectedDate).toEqual(new Date(currentYear, 11, 1));
            });
            it('attr.aria-expanded is false', () => {
              expect(monthpicker.attributes['aria-expanded']).toBe('false');
            });
            describe('enter is pressed', () => {
              beforeEach(() => {
                jasmine.clock().uninstall();
                jasmine.clock().install();
                monthpicker.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
                fixture.detectChanges();
                jasmine.clock().tick(100);
              });
              it('last month of the year has focus', () => {
                let focusedElement = rootElement.query(By.css(':focus'));
                expect(focusedElement.nativeElement.innerText).toBe('Dec');
              });
            });
          })
        })
        describe('escape is pressed', () => {
          beforeEach(() => {
            monthpicker.triggerEventHandler('keydown', { keyCode: 27, preventDefault: function () { } } as KeyboardEvent);
            fixture.detectChanges();
          });
          it('component is closed', () => {
            expect(component.expanded).toBe(false);
          });
          it('nothing is selected', () => {
            expect(component.selectedDate).toBeFalsy();
          });
          it('attr.aria-expanded is false', () => {
            expect(monthpicker.attributes['aria-expanded']).toBe('false');
          });
          describe('space is pressed', () => {
            beforeEach(() => {
              monthpicker.triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
              fixture.detectChanges();
            });
            it('monthpicker is expanded', () => {
              expect(component.expanded).toBe(true);
            });
            it('attr.aria-expanded is true', () => {
              expect(monthpicker.attributes['aria-expanded']).toBe('true');
            });
          });

        });
        describe('pageUp is pressed', () => {
          beforeEach(() => {
            monthpicker.triggerEventHandler('keydown', { keyCode: 33, preventDefault: function () { } } as KeyboardEvent);
            fixture.detectChanges();
          });
          it('current month has focus', () => {
            let focusedElement = rootElement.query(By.css(':focus'));
            expect(focusedElement.nativeElement.innerText).toBe(component.getMonthName(currentMonth));
          });
          it('previous year is in view', () => {
            expect(currentYearElement.nativeElement.innerText).toBe((currentYear - 1).toString());
          });
          describe('pageUp is pressed', () => {
            beforeEach(() => {
              monthpicker.triggerEventHandler('keydown', { keyCode: 34, preventDefault: function () { } } as KeyboardEvent);
              fixture.detectChanges();
            });
            it('current month has focus', () => {
              let focusedElement = rootElement.query(By.css(':focus'));
              expect(focusedElement.nativeElement.innerText).toBe(component.getMonthName(currentMonth));
            });
            it('previous year is in view', () => {
              expect(currentYearElement.nativeElement.innerText).toBe(currentYear.toString());
            });
          })
        })
        describe('tab is pressed', () => {
          beforeEach(() => {
            monthpicker.triggerEventHandler('keydown', { keyCode: 9, preventDefault: function () { } } as KeyboardEvent);
            fixture.detectChanges();
          });
          it('monthpicker is collapsed', () => {
            expect(component.expanded).toBe(false);
          });
          it('attr.aria-expanded is false', () => {
            expect(monthpicker.attributes['aria-expanded']).toBe('false');
          });
          it('no month is selected', () => {
            expect(component.selectedDate).toBeFalsy();
          })
        })
      });
    });
  });
});

