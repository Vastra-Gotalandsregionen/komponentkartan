import { KomponentkartanPage } from './app.po';

describe('komponentkartan App', () => {
  let page: KomponentkartanPage;

  beforeEach(() => {
    page = new KomponentkartanPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
