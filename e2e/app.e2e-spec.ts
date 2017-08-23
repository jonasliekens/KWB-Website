import { KwbWebsitePage } from './app.po';

describe('kwb-website App', function() {
  let page: KwbWebsitePage;

  beforeEach(() => {
    page = new KwbWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
