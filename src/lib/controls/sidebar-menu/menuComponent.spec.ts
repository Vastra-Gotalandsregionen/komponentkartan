import { MenuLegacyComponent } from '../../controls/sidebar-menu/menu.component';
import { IMenu, IMenuGroup, IMenuItem } from '../../models/menu.model';
import { BrowserDetector } from '../../services/browserDetector';

let menuComponent: MenuLegacyComponent;
let browserDetector: BrowserDetector;

describe('When ngAfterViewInit is called', () => {
    it('onInitialized event is emitted', () => {
        menuComponent = new MenuLegacyComponent(null);

        spyOn(menuComponent.onInitialized, 'emit');

        menuComponent.ngAfterViewInit();

        expect(menuComponent.onInitialized.emit).toHaveBeenCalled();
    });
});
describe('When ngOnChanges is called', () => {
    beforeEach(() => {
        menuComponent = new MenuLegacyComponent(null);
    });
    describe('and menu is not initialized', () => {
        it('exception is not thrown', () => {
            const func = () => {
                menuComponent.ngOnChanges();
            };
            expect(func).not.toThrow();
        });
    });
    describe('and menu is initialized', () => {
        describe('and menuItems is not initialized', () => {
            describe('and menu is single menu', () => {
                beforeEach(() => {
                    menuComponent.isSingleMenu = true;
                });
                describe('and menu has more than three items', () => {
                    it('all items are visible', () => {
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
                                }] as IMenuItem[]
                            }] as IMenuGroup[]
                        } as IMenu;

                        menuComponent.ngOnChanges();
                        expect(menuComponent.menuItems.filter(menuItem => menuItem.visible).length).toBe(menuComponent.menuItems.length);
                    });
                    describe('and menu har more than one group', () => {
                        it('separators are displayed', () => {
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
                                    }] as IMenuItem[]
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
                                    }] as IMenuItem[]
                                }
                                ] as IMenuGroup[]
                            } as IMenu;

                            menuComponent.ngOnChanges();
                            expect(menuComponent.menuItems.filter(menuItem => menuItem.isSeparator).length).toBe(1);
                        });
                    });
                });
                describe('and menu has less than three items', () => {
                    it('all items are visible', () => {
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
                                }] as IMenuItem[]
                            }] as IMenuGroup[]
                        } as IMenu;

                        menuComponent.ngOnChanges();
                        expect(menuComponent.menuItems.filter(menuItem => menuItem.visible).length).toBe(menuComponent.menuItems.length);
                    });
                    describe('and menu har more than one group', () => {
                        it('no separators are displayed', () => {
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
                                    }] as IMenuItem[]
                                },
                                {
                                    order: '2',
                                    menuItems: [{
                                        title: 'menyalternativ tre',
                                        url: '/tre',
                                        favourite: true,
                                        order: '2.1',
                                        menuItems: null
                                    }] as IMenuItem[]
                                }
                                ] as IMenuGroup[]
                            } as IMenu;

                            menuComponent.ngOnChanges();
                            expect(menuComponent.menuItems.filter(menuItem => menuItem.isSeparator).length).toBe(0);
                        });
                    });
                });
            });
            describe('and menu is multiple menu', () => {
                beforeEach(() => {
                    menuComponent.isSingleMenu = false;
                });
                describe('and menu has more than three favourites', () => {
                    describe('and all favourites are first level items', () => {
                        beforeEach(() => {
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
                                    }] as IMenuItem[]
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
                                    }] as IMenuItem[]
                                }
                                ] as IMenuGroup[]
                            } as IMenu;
                        });
                        describe('and menu is expanded', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = true;
                            });
                            it('all first level items are visible', () => {
                                menuComponent.ngOnChanges();
                                expect(menuComponent.menuItems.filter(menuItem => menuItem.visible).length).toBe(menuComponent.menuItems.length);
                            });
                            it('separators are displayed', () => {
                                menuComponent.ngOnChanges();
                                expect(menuComponent.menuItems.filter(menuItem => menuItem.isSeparator).length).toBe(1);
                            });
                        });
                        describe('and menu is collapsed', () => {
                            it('top three favourites are visible', () => {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();

                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.length).toBe(3);
                                expect(visibleMenuItems[0].title).toBe('menyalternativ ett');
                                expect(visibleMenuItems[1].title).toBe('menyalternativ två');
                                expect(visibleMenuItems[2].title).toBe('menyalternativ tre');
                            });
                        });
                    });
                    describe('and some favourites are second level items', () => {
                        beforeEach(() => {
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
                                        ] as IMenuItem[]
                                    },
                                    ] as IMenuItem[]
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
                                    }] as IMenuItem[]
                                }
                                ] as IMenuGroup[]
                            } as IMenu;
                        });
                        describe('and menu is expanded', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });

                            it('all first level items are visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.child).length).toBe(0);
                            });
                            it('separators are displayed', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isSeparator).length).toBe(1);
                            });
                            it('second level favourites are not visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isVirtualFavourite).length).toBe(0);
                            });
                        });
                        describe('and menu is collapsed', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('top three favourites including second level favourites are visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.map(x => x.order)).toEqual(['1.1', '1.2', '1.3.1']);
                            });
                            it('no separators are displayed', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isSeparator).length).toBe(0);
                            });
                        });
                    });

                });
                describe('and menu has three favourites', () => {
                    describe('and all favourites are first level items', () => {
                        beforeEach(() => {
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
                                    }] as IMenuItem[]
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
                                    }] as IMenuItem[]
                                }
                                ] as IMenuGroup[]
                            } as IMenu;
                        });
                        describe('and menu is expanded', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });
                            it('all first level items are visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.child).length).toBe(0);
                            });
                            it('separators are displayed', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isSeparator).length).toBe(1);
                            });

                        });
                        describe('and menu is collapsed', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('all three favourites are visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(x => x.visible);
                                const favouriteMenuItems = menuComponent.menuItems.filter(x => x.favourite);

                                expect(visibleMenuItems).toEqual(favouriteMenuItems);
                            });
                        });
                    });
                    describe('and some favourites are second level items', () => {
                        beforeEach(() => {
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
                                        ] as IMenuItem[]
                                    },
                                    ] as IMenuItem[]
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
                                    }] as IMenuItem[]
                                }
                                ] as IMenuGroup[]
                            } as IMenu;
                        });
                        describe('and menu is expanded', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });
                            it('all first level items are visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.child).length).toBe(0);
                            });
                            it('separators are displayed', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isSeparator).length).toBe(1);
                            });
                            it('second level favourites are not visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isVirtualFavourite).length).toBe(0);
                            });
                        });
                        describe('and menu is collapsed', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('the three favourites including second level favourites are visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.map(x => x.order)).toEqual(['1.1', '1.2', '1.3.1']);
                            });
                            it('no separators are displayed', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isSeparator).length).toBe(0);
                            });
                        });
                    });
                });
                describe('and menu has two (less than three) favourites', () => {
                    describe('and all favourites are first level items', () => {
                        beforeEach(() => {
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
                                    }] as IMenuItem[]
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
                                    }] as IMenuItem[]
                                }
                                ] as IMenuGroup[]
                            } as IMenu;
                        });
                        describe('and menu is expanded', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });
                            it('all first level items are visible', () => {
                                expect(menuComponent.menuItems.filter(x => !x.visible).length).toBe(0);
                            });
                            it('separators are displayed', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isSeparator).length).toBe(1);
                            });
                        });
                        describe('and menu is collapsed', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('top two favourites are visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.map(x => x.favourite)).toEqual([true, true]);
                            });
                        });
                    });
                    describe('and one favourite is a second level item', () => {
                        beforeEach(() => {
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
                                        ] as IMenuItem[]
                                    },
                                    ] as IMenuItem[]
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
                                    }] as IMenuItem[]
                                }
                                ] as IMenuGroup[]
                            } as IMenu;
                        });
                        describe('and menu is expanded', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = true;
                                menuComponent.ngOnChanges();
                            });
                            it('all first level items are visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.child).length).toBe(0);
                            });
                            it('separators are displayed', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isSeparator).length).toBe(1);
                            });
                            it('second level favourites are not visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isVirtualFavourite).length).toBe(0);
                            });
                        });
                        describe('and menu is collapsed', () => {
                            beforeEach(() => {
                                menuComponent.menu.expanded = false;
                                menuComponent.ngOnChanges();
                            });
                            it('the two favourites including second level favourite are visible', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.map(x => x.order)).toEqual(['1.1', '1.3.1']);
                            });
                            it('no separators are displayed', () => {
                                const visibleMenuItems = menuComponent.menuItems.filter(menuItem => menuItem.visible);
                                expect(visibleMenuItems.filter(x => x.isSeparator).length).toBe(0);
                            });
                        });
                    });
                });
                describe('and menu has three items', () => {
                    beforeEach(() => {
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
                                }] as IMenuItem[]
                            },
                            {
                                order: '2',
                                menuItems: [{
                                    title: 'menyalternativ tre',
                                    url: '/fem',
                                    favourite: false,
                                    order: '2.1',
                                    menuItems: null
                                }] as IMenuItem[]
                            }
                            ] as IMenuGroup[]
                        } as IMenu;

                        menuComponent.ngOnChanges();
                    });
                    it('all items are visible', () => {
                        expect(menuComponent.menuItems.filter(x => x.visible).length).toBe(3);
                    });
                    it('no separators exist', () => {
                        expect(menuComponent.menuItems.filter(x => x.isSeparator).length).toBe(0);
                    });
                });
                describe('and menu has less than three items', () => {
                    beforeEach(() => {
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
                                ] as IMenuItem[]
                            },
                            {
                                order: '2',
                                menuItems: [{
                                    title: 'menyalternativ tre',
                                    url: '/fem',
                                    favourite: false,
                                    order: '2.1',
                                    menuItems: null
                                }] as IMenuItem[]
                            }
                            ] as IMenuGroup[]
                        } as IMenu;

                        menuComponent.ngOnChanges();
                    });
                    it('all items are visible', () => {
                        expect(menuComponent.menuItems.filter(x => x.visible).length).toBe(2);
                    });
                    it('no separators exist', () => {
                        expect(menuComponent.menuItems.filter(x => x.isSeparator).length).toBe(0);
                    });
                });
            });
        });
        describe('and menuItems is already initialized', () => {
            beforeEach(() => {
                menuComponent.menu = { groups: [{ menuItems: [{} as IMenuItem, {} as IMenuItem] as IMenuItem[] }] as IMenuGroup[] } as IMenu;
                menuComponent.menuItems = [{} as IMenuItem] as IMenuItem[];
                menuComponent.ngOnChanges();
            });
            it('menuItems are not updated', () => {
                expect(menuComponent.menuItems.length).toBe(1);
            });
        });
    });

    describe('and menu has one group', () => {
        beforeEach(() => {
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
                    }] as IMenuItem[]
                }] as IMenuGroup[]
            } as IMenu;
        });
        it('no separator items are added', () => {
            menuComponent.ngOnChanges();

            expect(menuComponent.menuItems.filter(menuItem => menuItem.isSeparator).length).toBe(0);
        });
    });
    describe('and menu has multiple groups', () => {
        beforeEach(() => {
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
                    }] as IMenuItem[]
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
                    }] as IMenuItem[]
                }] as IMenuGroup[]
            } as IMenu;
        });
        it('separator items are added', () => {
            menuComponent.ngOnChanges();

            expect(menuComponent.menuItems.filter(menuItem => menuItem.isSeparator).length).toBe(1);
        });
    });
});

describe('when menu groups, items and childitems are unsorted', () => {
    beforeEach(() => {
        menuComponent = new MenuLegacyComponent(null);
        menuComponent.menu = {
            groups: [
                {
                    order: '2',
                    menuItems: [{ order: '2.3' } as IMenuItem, { order: '2.1' } as IMenuItem, { order: '2.2' } as IMenuItem] as IMenuItem[]
                } as IMenuGroup,
                {
                    order: '1',
                    menuItems: [
                        { order: '1.3' } as IMenuItem,
                        { order: '1.2', menuItems: [{ order: '1.2.2' } as IMenuItem, { order: '1.2.1' } as IMenuItem] } as IMenuItem] as IMenuItem[]
                } as IMenuGroup
            ] as IMenuGroup[]
        } as IMenu;
    });
    describe('when menu is initialized', () => {
        beforeEach(() => {
            menuComponent.ngOnChanges();
        });
        it('it adds a separator with order after the last element of the first group', () => {
            expect(menuComponent.menuItems[2].isSeparator).toBeTruthy();
            expect(menuComponent.menuItems[2].order).toEqual('1.3.1');
        });
        it('it sorts menu items by order ascending', () => {
            expect(menuComponent.menuItems[0].order).toEqual('1.2');
            expect(menuComponent.menuItems[1].order).toEqual('1.3');
            expect(menuComponent.menuItems[3].order).toEqual('2.1');
            expect(menuComponent.menuItems[4].order).toEqual('2.2');
            expect(menuComponent.menuItems[5].order).toEqual('2.3');
        });
        it('it sorts child menu items by order ascending', () => {
            expect(menuComponent.menuItems[0].menuItems[0].order).toEqual('1.2.1');
            expect(menuComponent.menuItems[0].menuItems[1].order).toEqual('1.2.2');
        });
    });
});

describe('when calling avaliableInThisBrowser', () => {
    beforeEach(() => {
        browserDetector = new BrowserDetector();
        menuComponent = new MenuLegacyComponent(browserDetector);

    });
    describe('and menu is Green', () => {
        beforeEach(() => { menuComponent.menu = { title: 'Rehab', theme: 'Green' } as IMenu; });
        it('returns true', () => {
            expect(menuComponent.availableInThisBrowser()).toBeTruthy();
        });
    });
    describe('and menu is Blue', () => {
        beforeEach(() => { menuComponent.menu = { title: 'BMM', theme: 'Blue' } as IMenu; });
        it('returns true', () => {
            expect(menuComponent.availableInThisBrowser()).toBeTruthy();
        });
    });
    describe('and menu is Red', () => {
        beforeEach(() => { menuComponent.menu = { title: 'VGPV', theme: 'Red' } as IMenu; });
        describe('and browser is Internet Explorer', () => {
            beforeEach(() => {
                spyOn(browserDetector, 'isInternetExplorer').and.returnValue(true);
            });
            it('returns true', () => {
                expect(menuComponent.availableInThisBrowser()).toBeTruthy();
            });
        });

        describe('and browser is not Internet Explorer', () => {
            beforeEach(() => {
                spyOn(browserDetector, 'isInternetExplorer').and.returnValue(false);
            });
            it('returns false', () => {
                expect(menuComponent.availableInThisBrowser()).toBeFalsy();
            });
        });
    });
});

describe('When setActiveMenuItem is called', () => {
    it('selected menu item is set', () => {
        menuComponent = new MenuLegacyComponent(null);

        const menuItem = { title: 'menu' } as IMenuItem;

        menuComponent.setActiveMenuItem(menuItem);

        expect(menuComponent.selectedMenuItem).toBe(menuItem);
    });
    describe('and selected menuItem is a favourite that is a child menuItem', () => {
        it('the child menuItem is selected', () => {
            menuComponent = new MenuLegacyComponent(null);

            const virtualFavouriteMenuItem = {
                title: 'undermenyalternativ',
                url: '/två',
                favourite: true,
                isVirtualFavourite: true,
                child: false
            } as IMenuItem;
            const favouriteChildMenuItem = {
                title: 'undermenyalternativ',
                url: '/två',
                favourite: true,
                child: true
            } as IMenuItem;

            menuComponent.menuItems = [
                virtualFavouriteMenuItem,
                {
                    title: 'menyrubrik',
                    menuItems: [favouriteChildMenuItem] as IMenuItem[]
                }
            ] as IMenuItem[];

            menuComponent.setActiveMenuItem(virtualFavouriteMenuItem);

            expect(menuComponent.selectedMenuItem).toBe(favouriteChildMenuItem);
        });
    });
});
describe('When toggleExpand is called', () => {
    describe('and menu is not a single menu and menuItems are more than three and menu is not expanded', () => {
        let virtualFavouriteMenuItem: IMenuItem;
        beforeEach(() => {
            menuComponent = new MenuLegacyComponent(null);

            menuComponent.isSingleMenu = false;
            menuComponent.menu = { expanded: false } as IMenu;

            virtualFavouriteMenuItem = {
                title: 'Favorit 1',
                url: '/ett',
                favourite: true,
                isVirtualFavourite: true,
                child: false,
                visible: true
            } as IMenuItem;
            const favouriteChildMenuItem = {
                title: 'Favorit 1',
                url: '/ett',
                favourite: true,
                child: true,
                visible: false
            } as IMenuItem;

            const menuItemWithSubitem1 = {
                title: 'Menyrubrik 1',
                expanded: false,
                visible: false,
                menuItems: [{
                    title: 'Undermeny',
                    url: '/fyra',
                    favourite: false,
                    child: true,
                    visible: false
                } as IMenuItem] as IMenuItem[]
            };

            const menuItemWithSubitem2 = {
                title: 'Menyrubrik 2',
                expanded: false,
                visible: false,
                menuItems: [favouriteChildMenuItem] as IMenuItem[]
            };

            const favouriteMenuItem2 = { title: 'Favorit 2', url: '/två', favourite: true, visible: true } as IMenuItem;
            const favouriteMenuItem3 = { title: 'Favorit 3', url: '/tre', favourite: true, visible: true } as IMenuItem;

            menuComponent.menuItems = [
                virtualFavouriteMenuItem,
                favouriteMenuItem2,
                favouriteMenuItem3,
                menuItemWithSubitem1,
                menuItemWithSubitem2
            ] as IMenuItem[];
        });
        describe('and favourite in sub menu is selected', () => {
            beforeEach(() => {
                menuComponent.setActiveMenuItem(virtualFavouriteMenuItem);
                menuComponent.toggleExpand();
            });
            it('submenu containing selected item is expanded', () => {
                expect(menuComponent.menuItems.filter(x => x.title === 'Menyrubrik 2')[0].expanded).toBe(true);
            });
            it('submenu containing selected item is visible', () => {
                expect(menuComponent.menuItems.filter(x => x.title === 'Menyrubrik 2')[0].visible).toBe(true);
            });
            it('virtual favourite is not visible', () => {
                expect(menuComponent.menuItems.filter(x => x.title === 'Favorit 1' && x.isVirtualFavourite)[0].visible).toBeFalsy();
            });
        });
    });
});
