"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var menu_component_1 = require("../../component-package/controls/sidebar-menu/menu.component");
var browserDetector_1 = require("../../component-package/services/browserDetector");
var menuComponent;
var browserDetector;
describe('When ngAfterViewInit is called', function () {
    it('onInitialized event is emitted', function () {
        menuComponent = new menu_component_1.MenuComponent(null);
        spyOn(menuComponent.onInitialized, 'emit');
        menuComponent.ngAfterViewInit();
        expect(menuComponent.onInitialized.emit).toHaveBeenCalled();
    });
});
describe('When ngOnChanges is called', function () {
    beforeEach(function () {
        menuComponent = new menu_component_1.MenuComponent(null);
    });
    describe('and menu is not initialized', function () {
        it('exception is not thrown', function () {
            var func = function () {
                menuComponent.ngOnChanges();
            };
            expect(func).not.toThrow();
        });
    });
    describe('and menu is initialized', function () {
        describe('and menuItems is not initialized', function () {
            describe('and menu is single menu', function () {
                beforeEach(function () {
                    menuComponent.isSingleMenu = true;
                });
                describe('and menu has more than three items', function () {
                    it('all items are visible', function () {
                        menuComponent.menu = {
                            title: 'Meny 1',
                            groups: [{
                                    order: '1',
                                    menuItems: [{
                                            title: 'menyalternativ ett',
                                            url: '/ett',
                                            favourite: true,
                                            order: '1.1',
                                            menuItems: null
                                        },
                                        {
                                            title: 'menyalternativ två',
                                            url: '/två',
                                            favourite: false,
                                            order: '1.2',
                                            menuItems: null
                                        },
                                        {
                                            title: 'menyalternativ tre',
                                            url: '/tre',
                                            favourite: true,
                                            order: '1.3',
                                            menuItems: null
                                        },
                                        {
                                            title: 'menyalternativ fyra',
                                            url: '/fyra',
                                            favourite: true,
                                            order: '1.4',
                                            menuItems: null
                                        }]
                                }]
                        };
                        menuComponent.ngOnChanges();
                        expect(menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; }).length).toBe(menuComponent.menuItems.length);
                    });
                    describe('and menu har more than one group', function () {
                        it('separators are displayed', function () {
                            menuComponent.menu = {
                                title: 'Meny 1',
                                groups: [{
                                        order: '1',
                                        menuItems: [{
                                                title: 'menyalternativ ett',
                                                url: '/ett',
                                                favourite: true,
                                                order: '1.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ två',
                                                url: '/två',
                                                favourite: false,
                                                order: '1.2',
                                                menuItems: null
                                            }]
                                    },
                                    {
                                        order: '2',
                                        menuItems: [{
                                                title: 'menyalternativ tre',
                                                url: '/tre',
                                                favourite: true,
                                                order: '2.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ fyra',
                                                url: '/fyra',
                                                favourite: true,
                                                order: '2.2',
                                                menuItems: null
                                            }]
                                    }
                                ]
                            };
                            menuComponent.ngOnChanges();
                            expect(menuComponent.menuItems.filter(function (menuItem) { return menuItem.isSeparator; }).length).toBe(1);
                        });
                    });
                });
                describe('and menu has less than three items', function () {
                    it('all items are visible', function () {
                        menuComponent.menu = {
                            title: 'Meny 1',
                            groups: [{
                                    order: '1',
                                    menuItems: [{
                                            title: 'menyalternativ ett',
                                            url: '/ett',
                                            favourite: true,
                                            order: '1.1',
                                            menuItems: null
                                        },
                                        {
                                            title: 'menyalternativ två',
                                            url: '/två',
                                            favourite: false,
                                            order: '1.2',
                                            menuItems: null
                                        }]
                                }]
                        };
                        menuComponent.ngOnChanges();
                        expect(menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; }).length).toBe(menuComponent.menuItems.length);
                    });
                    describe('and menu har more than one group', function () {
                        it('no separators are displayed', function () {
                            menuComponent.menu = {
                                title: 'Meny 1',
                                groups: [{
                                        order: '1',
                                        menuItems: [{
                                                title: 'menyalternativ ett',
                                                url: '/ett',
                                                favourite: true,
                                                order: '1.1',
                                                menuItems: null
                                            }]
                                    },
                                    {
                                        order: '2',
                                        menuItems: [{
                                                title: 'menyalternativ tre',
                                                url: '/tre',
                                                favourite: true,
                                                order: '2.1',
                                                menuItems: null
                                            }]
                                    }
                                ]
                            };
                            menuComponent.ngOnChanges();
                            expect(menuComponent.menuItems.filter(function (menuItem) { return menuItem.isSeparator; }).length).toBe(0);
                        });
                    });
                });
            });
            describe('and menu is multiple menu', function () {
                beforeEach(function () {
                    menuComponent.isSingleMenu = false;
                });
                describe('and menu has more than three favourites', function () {
                    describe('and all favourites are first level items', function () {
                        beforeEach(function () {
                            menuComponent.menu = {
                                title: 'Meny 1',
                                groups: [{
                                        order: '1',
                                        menuItems: [{
                                                title: 'menyalternativ ett',
                                                url: '/ett',
                                                favourite: true,
                                                order: '1.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ två',
                                                url: '/två',
                                                favourite: true,
                                                order: '1.2',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ tre',
                                                url: '/tre',
                                                favourite: true,
                                                order: '1.3',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ fyra',
                                                url: '/fyra',
                                                favourite: true,
                                                order: '1.4',
                                                menuItems: null
                                            }]
                                    },
                                    {
                                        order: '2',
                                        menuItems: [{
                                                title: 'menyalternativ fem',
                                                url: '/fem',
                                                favourite: true,
                                                order: '2.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ sex',
                                                url: '/sex',
                                                favourite: true,
                                                order: '2.2',
                                                menuItems: null
                                            }]
                                    }
                                ]
                            };
                        });
                        describe('and menu is expanded', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = true;
                            });
                            it('all first level items are visible', function () {
                                menuComponent.ngOnChanges();
                                expect(menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; }).length).toBe(menuComponent.menuItems.length);
                            });
                            it('separators are displayed', function () {
                                menuComponent.ngOnChanges();
                                expect(menuComponent.menuItems.filter(function (menuItem) { return menuItem.isSeparator; }).length).toBe(1);
                            });
                        });
                        describe('and menu is collapsed', function () {
                            it('top three favourites are visible', function () {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.length).toBe(3);
                                expect(visibleMenuItems[0].title).toBe('menyalternativ ett');
                                expect(visibleMenuItems[1].title).toBe('menyalternativ två');
                                expect(visibleMenuItems[2].title).toBe('menyalternativ tre');
                            });
                        });
                    });
                    describe('and some favourites are second level items', function () {
                        beforeEach(function () {
                            menuComponent.menu = {
                                title: 'Meny 1',
                                groups: [{
                                        order: '1',
                                        menuItems: [{
                                                title: 'menyalternativ ett',
                                                url: '/ett',
                                                favourite: true,
                                                order: '1.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ två',
                                                url: '/två',
                                                favourite: true,
                                                order: '1.2',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ tre',
                                                url: '/tre',
                                                favourite: false,
                                                order: '1.3',
                                                menuItems: [
                                                    {
                                                        title: 'underalternativ tre.ett',
                                                        url: '/treEtt',
                                                        favourite: true,
                                                        order: '1.3.1',
                                                        menuItems: null
                                                    },
                                                    {
                                                        title: 'underalternativ tre.två',
                                                        url: '/treTvå',
                                                        favourite: true,
                                                        order: '1.3.2',
                                                        menuItems: null
                                                    }
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        order: '2',
                                        menuItems: [{
                                                title: 'menyalternativ fem',
                                                url: '/fem',
                                                favourite: true,
                                                order: '2.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ sex',
                                                url: '/sex',
                                                favourite: true,
                                                order: '2.2',
                                                menuItems: null
                                            }]
                                    }
                                ]
                            };
                        });
                        describe('and menu is expanded', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });
                            it('all first level items are visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.child; }).length).toBe(0);
                            });
                            it('separators are displayed', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isSeparator; }).length).toBe(1);
                            });
                            it('second level favourites are not visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isVirtualFavourite; }).length).toBe(0);
                            });
                        });
                        describe('and menu is collapsed', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('top three favourites including second level favourites are visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.map(function (x) { return x.order; })).toEqual(['1.1', '1.2', '1.3.1']);
                            });
                            it('no separators are displayed', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isSeparator; }).length).toBe(0);
                            });
                        });
                    });
                });
                describe('and menu has three favourites', function () {
                    describe('and all favourites are first level items', function () {
                        beforeEach(function () {
                            menuComponent.menu = {
                                title: 'Meny 1',
                                groups: [{
                                        order: '1',
                                        menuItems: [{
                                                title: 'menyalternativ ett',
                                                url: '/ett',
                                                favourite: true,
                                                order: '1.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ två',
                                                url: '/två',
                                                favourite: true,
                                                order: '1.2',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ tre',
                                                url: '/tre',
                                                favourite: true,
                                                order: '1.3',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ fyra',
                                                url: '/fyra',
                                                favourite: false,
                                                order: '1.4',
                                                menuItems: null
                                            }]
                                    },
                                    {
                                        order: '2',
                                        menuItems: [{
                                                title: 'menyalternativ fem',
                                                url: '/fem',
                                                favourite: false,
                                                order: '2.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ sex',
                                                url: '/sex',
                                                favourite: false,
                                                order: '2.2',
                                                menuItems: null
                                            }]
                                    }
                                ]
                            };
                        });
                        describe('and menu is expanded', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });
                            it('all first level items are visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.child; }).length).toBe(0);
                            });
                            it('separators are displayed', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isSeparator; }).length).toBe(1);
                            });
                        });
                        describe('and menu is collapsed', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('all three favourites are visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (x) { return x.visible; });
                                var favouriteMenuItems = menuComponent.menuItems.filter(function (x) { return x.favourite; });
                                expect(visibleMenuItems).toEqual(favouriteMenuItems);
                            });
                        });
                    });
                    describe('and some favourites are second level items', function () {
                        beforeEach(function () {
                            menuComponent.menu = {
                                title: 'Meny 1',
                                groups: [{
                                        order: '1',
                                        menuItems: [{
                                                title: 'menyalternativ ett',
                                                url: '/ett',
                                                favourite: true,
                                                order: '1.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ två',
                                                url: '/två',
                                                favourite: true,
                                                order: '1.2',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ tre',
                                                url: '/tre',
                                                favourite: false,
                                                order: '1.3',
                                                menuItems: [
                                                    {
                                                        title: 'underalternativ tre.ett',
                                                        url: '/treEtt',
                                                        favourite: true,
                                                        order: '1.3.1',
                                                        menuItems: null
                                                    }
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        order: '2',
                                        menuItems: [{
                                                title: 'menyalternativ fem',
                                                url: '/fem',
                                                favourite: false,
                                                order: '2.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ sex',
                                                url: '/sex',
                                                favourite: false,
                                                order: '2.2',
                                                menuItems: null
                                            }]
                                    }
                                ]
                            };
                        });
                        describe('and menu is expanded', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });
                            it('all first level items are visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.child; }).length).toBe(0);
                            });
                            it('separators are displayed', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isSeparator; }).length).toBe(1);
                            });
                            it('second level favourites are not visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isVirtualFavourite; }).length).toBe(0);
                            });
                        });
                        describe('and menu is collapsed', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('the three favourites including second level favourites are visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.map(function (x) { return x.order; })).toEqual(['1.1', '1.2', '1.3.1']);
                            });
                            it('no separators are displayed', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isSeparator; }).length).toBe(0);
                            });
                        });
                    });
                });
                describe('and menu has two (less than three) favourites', function () {
                    describe('and all favourites are first level items', function () {
                        beforeEach(function () {
                            menuComponent.menu = {
                                title: 'Meny 1',
                                groups: [{
                                        order: '1',
                                        menuItems: [{
                                                title: 'menyalternativ ett',
                                                url: '/ett',
                                                favourite: true,
                                                order: '1.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ två',
                                                url: '/två',
                                                favourite: false,
                                                order: '1.2',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ tre',
                                                url: '/tre',
                                                favourite: true,
                                                order: '1.3',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ fyra',
                                                url: '/fyra',
                                                favourite: false,
                                                order: '1.4',
                                                menuItems: null
                                            }]
                                    },
                                    {
                                        order: '2',
                                        menuItems: [{
                                                title: 'menyalternativ fem',
                                                url: '/fem',
                                                favourite: false,
                                                order: '2.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ sex',
                                                url: '/sex',
                                                favourite: false,
                                                order: '2.2',
                                                menuItems: null
                                            }]
                                    }
                                ]
                            };
                        });
                        describe('and menu is expanded', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });
                            it('all first level items are visible', function () {
                                expect(menuComponent.menuItems.filter(function (x) { return !x.visible; }).length).toBe(0);
                            });
                            it('separators are displayed', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isSeparator; }).length).toBe(1);
                            });
                        });
                        describe('and menu is collapsed', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('top two favourites are visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.map(function (x) { return x.favourite; })).toEqual([true, true]);
                            });
                        });
                    });
                    describe('and one favourite is a second level item', function () {
                        beforeEach(function () {
                            menuComponent.menu = {
                                title: 'Meny 1',
                                groups: [{
                                        order: '1',
                                        menuItems: [{
                                                title: 'menyalternativ ett',
                                                url: '/ett',
                                                favourite: true,
                                                order: '1.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ två',
                                                url: '/två',
                                                favourite: false,
                                                order: '1.2',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ tre',
                                                url: '/tre',
                                                favourite: false,
                                                order: '1.3',
                                                menuItems: [
                                                    {
                                                        title: 'underalternativ tre.ett',
                                                        url: '/treEtt',
                                                        favourite: true,
                                                        order: '1.3.1',
                                                        menuItems: null
                                                    }
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        order: '2',
                                        menuItems: [{
                                                title: 'menyalternativ fyra',
                                                url: '/fyra',
                                                favourite: false,
                                                order: '2.1',
                                                menuItems: null
                                            },
                                            {
                                                title: 'menyalternativ sex',
                                                url: '/sex',
                                                favourite: false,
                                                order: '2.2',
                                                menuItems: null
                                            }]
                                    }
                                ]
                            };
                        });
                        describe('and menu is expanded', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });
                            it('all first level items are visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.child; }).length).toBe(0);
                            });
                            it('separators are displayed', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isSeparator; }).length).toBe(1);
                            });
                            it('second level favourites are not visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isVirtualFavourite; }).length).toBe(0);
                            });
                        });
                        describe('and menu is collapsed', function () {
                            beforeEach(function () {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('the two favourites including second level favourite are visible', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.map(function (x) { return x.order; })).toEqual(['1.1', '1.3.1']);
                            });
                            it('no separators are displayed', function () {
                                var visibleMenuItems = menuComponent.menuItems.filter(function (menuItem) { return menuItem.visible; });
                                expect(visibleMenuItems.filter(function (x) { return x.isSeparator; }).length).toBe(0);
                            });
                        });
                    });
                });
                describe('and menu has three items', function () {
                    beforeEach(function () {
                        menuComponent.menu = {
                            title: 'Meny 1',
                            groups: [{
                                    order: '1',
                                    menuItems: [{
                                            title: 'menyalternativ ett',
                                            url: '/ett',
                                            favourite: true,
                                            order: '1.1',
                                            menuItems: null
                                        },
                                        {
                                            title: 'menyalternativ två',
                                            url: '/två',
                                            favourite: false,
                                            order: '1.2',
                                            menuItems: null
                                        }]
                                },
                                {
                                    order: '2',
                                    menuItems: [{
                                            title: 'menyalternativ tre',
                                            url: '/fem',
                                            favourite: false,
                                            order: '2.1',
                                            menuItems: null
                                        }]
                                }
                            ]
                        };
                        menuComponent.ngOnChanges();
                    });
                    it('all items are visible', function () {
                        expect(menuComponent.menuItems.filter(function (x) { return x.visible; }).length).toBe(3);
                    });
                    it('no separators exist', function () {
                        expect(menuComponent.menuItems.filter(function (x) { return x.isSeparator; }).length).toBe(0);
                    });
                });
                describe('and menu has less than three items', function () {
                    beforeEach(function () {
                        menuComponent.menu = {
                            title: 'Meny 1',
                            groups: [{
                                    order: '1',
                                    menuItems: [{
                                            title: 'menyalternativ ett',
                                            url: '/ett',
                                            favourite: true,
                                            order: '1.1',
                                            menuItems: null
                                        }
                                    ]
                                },
                                {
                                    order: '2',
                                    menuItems: [{
                                            title: 'menyalternativ tre',
                                            url: '/fem',
                                            favourite: false,
                                            order: '2.1',
                                            menuItems: null
                                        }]
                                }
                            ]
                        };
                        menuComponent.ngOnChanges();
                    });
                    it('all items are visible', function () {
                        expect(menuComponent.menuItems.filter(function (x) { return x.visible; }).length).toBe(2);
                    });
                    it('no separators exist', function () {
                        expect(menuComponent.menuItems.filter(function (x) { return x.isSeparator; }).length).toBe(0);
                    });
                });
            });
        });
        describe('and menuItems is already initialized', function () {
            beforeEach(function () {
                menuComponent.menu = { groups: [{ menuItems: [{}, {}] }] };
                menuComponent.menuItems = [{}];
                menuComponent.ngOnChanges();
            });
            it('menuItems are not updated', function () {
                expect(menuComponent.menuItems.length).toBe(1);
            });
        });
    });
    describe('and menu has one group', function () {
        beforeEach(function () {
            menuComponent.menu = {
                title: 'Meny 1',
                groups: [{
                        order: '1',
                        menuItems: [{
                                title: 'menyalternativ ett',
                                url: '/ett',
                                favourite: true,
                                order: '1.1',
                                menuItems: null
                            },
                            {
                                title: 'menyalternativ två',
                                url: '/två',
                                favourite: false,
                                order: '1.2',
                                menuItems: null
                            },
                            {
                                title: 'menyalternativ tre',
                                url: '/tre',
                                favourite: true,
                                order: '1.3',
                                menuItems: null
                            },
                            {
                                title: 'menyalternativ fyra',
                                url: '/fyra',
                                favourite: true,
                                order: '1.4',
                                menuItems: null
                            }]
                    }]
            };
        });
        it('no separator items are added', function () {
            menuComponent.ngOnChanges();
            expect(menuComponent.menuItems.filter(function (menuItem) { return menuItem.isSeparator; }).length).toBe(0);
        });
    });
    describe('and menu has multiple groups', function () {
        beforeEach(function () {
            menuComponent.menu = {
                title: 'Meny 1',
                groups: [{
                        order: '1',
                        menuItems: [{
                                title: 'menyalternativ ett',
                                url: '/ett',
                                favourite: true,
                                order: '1.1',
                                menuItems: null
                            }]
                    },
                    {
                        order: '2',
                        menuItems: [{
                                title: 'menyalternativ ett',
                                url: '/ett',
                                favourite: true,
                                order: '2.1',
                                menuItems: null
                            },
                            {
                                title: 'menyalternativ två',
                                url: '/två',
                                favourite: false,
                                order: '2.2',
                                menuItems: null
                            },
                            {
                                title: 'menyalternativ tre',
                                url: '/tre',
                                favourite: true,
                                order: '2.3',
                                menuItems: null
                            },
                            {
                                title: 'menyalternativ fyra',
                                url: '/fyra',
                                favourite: true,
                                order: '2.4',
                                menuItems: null
                            }]
                    }]
            };
        });
        it('separator items are added', function () {
            menuComponent.ngOnChanges();
            expect(menuComponent.menuItems.filter(function (menuItem) { return menuItem.isSeparator; }).length).toBe(1);
        });
    });
});
describe('when menu groups, items and childitems are unsorted', function () {
    beforeEach(function () {
        menuComponent = new menu_component_1.MenuComponent(null);
        menuComponent.menu = {
            groups: [
                {
                    order: '2',
                    menuItems: [{ order: '2.3' }, { order: '2.1' }, { order: '2.2' }]
                },
                {
                    order: '1',
                    menuItems: [
                        { order: '1.3' },
                        { order: '1.2', menuItems: [{ order: '1.2.2' }, { order: '1.2.1' }] }
                    ]
                }
            ]
        };
    });
    describe('when menu is initialized', function () {
        beforeEach(function () {
            menuComponent.ngOnChanges();
        });
        it('it adds a separator with order after the last element of the first group', function () {
            expect(menuComponent.menuItems[2].isSeparator).toBeTruthy();
            expect(menuComponent.menuItems[2].order).toEqual('1.3.1');
        });
        it('it sorts menu items by order ascending', function () {
            expect(menuComponent.menuItems[0].order).toEqual('1.2');
            expect(menuComponent.menuItems[1].order).toEqual('1.3');
            expect(menuComponent.menuItems[3].order).toEqual('2.1');
            expect(menuComponent.menuItems[4].order).toEqual('2.2');
            expect(menuComponent.menuItems[5].order).toEqual('2.3');
        });
        it('it sorts child menu items by order ascending', function () {
            expect(menuComponent.menuItems[0].menuItems[0].order).toEqual('1.2.1');
            expect(menuComponent.menuItems[0].menuItems[1].order).toEqual('1.2.2');
        });
    });
});
describe('when calling avaliableInThisBrowser', function () {
    beforeEach(function () {
        browserDetector = new browserDetector_1.BrowserDetector();
        menuComponent = new menu_component_1.MenuComponent(browserDetector);
    });
    describe('and menu is Green', function () {
        beforeEach(function () { menuComponent.menu = { title: 'Rehab', theme: 'Green' }; });
        it('returns true', function () {
            expect(menuComponent.availableInThisBrowser()).toBeTruthy();
        });
    });
    describe('and menu is Blue', function () {
        beforeEach(function () { menuComponent.menu = { title: 'BMM', theme: 'Blue' }; });
        it('returns true', function () {
            expect(menuComponent.availableInThisBrowser()).toBeTruthy();
        });
    });
    describe('and menu is Red', function () {
        beforeEach(function () { menuComponent.menu = { title: 'VGPV', theme: 'Red' }; });
        describe('and browser is Internet Explorer', function () {
            beforeEach(function () {
                spyOn(browserDetector, 'isInternetExplorer').and.returnValue(true);
            });
            it('returns true', function () {
                expect(menuComponent.availableInThisBrowser()).toBeTruthy();
            });
        });
        describe('and browser is not Internet Explorer', function () {
            beforeEach(function () {
                spyOn(browserDetector, 'isInternetExplorer').and.returnValue(false);
            });
            it('returns false', function () {
                expect(menuComponent.availableInThisBrowser()).toBeFalsy();
            });
        });
    });
});
describe('When setActiveMenuItem is called', function () {
    it('selected menu item is set', function () {
        menuComponent = new menu_component_1.MenuComponent(null);
        var menuItem = { title: 'menu' };
        menuComponent.setActiveMenuItem(menuItem);
        expect(menuComponent.selectedMenuItem).toBe(menuItem);
    });
    describe('and selected menuItem is a favourite that is a child menuItem', function () {
        it('the child menuItem is selected', function () {
            menuComponent = new menu_component_1.MenuComponent(null);
            var virtualFavouriteMenuItem = {
                title: 'undermenyalternativ',
                url: '/två',
                favourite: true,
                isVirtualFavourite: true,
                child: false
            };
            var favouriteChildMenuItem = {
                title: 'undermenyalternativ',
                url: '/två',
                favourite: true,
                child: true
            };
            menuComponent.menuItems = [
                virtualFavouriteMenuItem,
                {
                    title: 'menyrubrik',
                    menuItems: [favouriteChildMenuItem]
                }
            ];
            menuComponent.setActiveMenuItem(virtualFavouriteMenuItem);
            expect(menuComponent.selectedMenuItem).toBe(favouriteChildMenuItem);
        });
    });
});
describe('When toggleExpand is called', function () {
    describe('and menu is not a single menu and menuItems are more than three and menu is not expanded', function () {
        var virtualFavouriteMenuItem;
        beforeEach(function () {
            menuComponent = new menu_component_1.MenuComponent(null);
            menuComponent.isSingleMenu = false;
            menuComponent.menu = { expanded: false };
            virtualFavouriteMenuItem = {
                title: 'Favorit 1',
                url: '/ett',
                favourite: true,
                isVirtualFavourite: true,
                child: false,
                visible: true
            };
            var favouriteChildMenuItem = {
                title: 'Favorit 1',
                url: '/ett',
                favourite: true,
                child: true,
                visible: false
            };
            var menuItemWithSubitem1 = {
                title: 'Menyrubrik 1',
                expanded: false,
                visible: false,
                menuItems: [{
                        title: 'Undermeny',
                        url: '/fyra',
                        favourite: false,
                        child: true,
                        visible: false
                    }]
            };
            var menuItemWithSubitem2 = {
                title: 'Menyrubrik 2',
                expanded: false,
                visible: false,
                menuItems: [favouriteChildMenuItem]
            };
            var favouriteMenuItem2 = { title: 'Favorit 2', url: '/två', favourite: true, visible: true };
            var favouriteMenuItem3 = { title: 'Favorit 3', url: '/tre', favourite: true, visible: true };
            menuComponent.menuItems = [
                virtualFavouriteMenuItem,
                favouriteMenuItem2,
                favouriteMenuItem3,
                menuItemWithSubitem1,
                menuItemWithSubitem2
            ];
        });
        describe('and favourite in sub menu is selected', function () {
            beforeEach(function () {
                menuComponent.setActiveMenuItem(virtualFavouriteMenuItem);
                menuComponent.toggleExpand();
            });
            it('submenu containing selected item is expanded', function () {
                expect(menuComponent.menuItems.filter(function (x) { return x.title === 'Menyrubrik 2'; })[0].expanded).toBe(true);
            });
            it('submenu containing selected item is visible', function () {
                expect(menuComponent.menuItems.filter(function (x) { return x.title === 'Menyrubrik 2'; })[0].visible).toBe(true);
            });
            it('virtual favourite is not visible', function () {
                expect(menuComponent.menuItems.filter(function (x) { return x.title === 'Favorit 1' && x.isVirtualFavourite; })[0].visible).toBeFalsy();
            });
        });
    });
});
//# sourceMappingURL=menuComponent.spec.js.map