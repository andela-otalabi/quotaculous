describe('Quotaculous App', function() {
  /*it('should add quotes', function() {
    browser.get('http://localhost:4000/');

    element(by.model('author')).sendKeys('seyi');
    element(by.model('quoteName')).sendKeys('talabi');
    element(by.model('category')).sendKeys('Love');

    element(by.id('submit')).click();

    var span = element(by.id('counts')).getText();
    expect(span).toBe('(2)');
  });

  it('should show all quotes', function() {
    browser.get('http://localhost:4000/');

    element(by.id('showQuotes')).click();
    element(by.id('jhjskjkj')).click();

    element(by.model('author')).sendKeys('seyi');
    element(by.model('quoteName')).sendKeys('talabi');
    element(by.model('category')).sendKeys('Love');

  });*/

  beforeEach(function() {
    browser.get('http://localhost:4000/');
    browser.waitForAngular();
  });

  it('should edit quotes', function() {

    element(by.id('showQuotes')).click();

    element(by.id('editQuote')).click();
    element(by.model('editQuote.author')).sendKeys('lllll');
    element(by.model('editQuote.name')).sendKeys('talabi');
    expect(element(by.id('save-button')).isDisplayed()).toBeTruthy();

    element(by.id('save-button')).click();

    browser.wait(EC.visibilityOf(element(by.id('showQuotes'))),20000);
    
    // element(by.id('showQuotes'));

    // expect(element(by.id('new-name'))).toBe('lobveeetalabi');
    element.all(by.repeater('quote in quoteList')).then(function(quote) {
      var quotes = quote[0].element(by.id('new-name'));
      expect(quotes.getText()).toEqual('lobveee');
    });
  });
});
