describe('Quotaculous App', function() {

  beforeEach(function() {
    browser.get('http://localhost:8000/');
    browser.waitForAngular();
  });

  it('should add and delete a quote', function() {

    element(by.model('author')).sendKeys('talabi');
    element(by.model('quoteName')).sendKeys('test quote');
    element(by.model('category')).sendKeys('Entertainment');

    element(by.id('submit')).click();

    var countBeforeDelete = element(by.id('counts')).getText().then(function(count){
      expect(count).toContain('(1)');
    });

    element(by.id('showQuotes')).click();

    // delete newly created quote
    element(by.id('talabi')).click();

    browser.switchTo().alert().accept();

    var countAfterDelete = element(by.id('counts')).getText()
    expect(countAfterDelete).toBe('(0)');

  });

  it('should add and like/dislike a quote', function() {

    element(by.model('author')).sendKeys('talabi');
    element(by.model('quoteName')).sendKeys('test quote');
    element(by.model('category')).sendKeys('fashion');

    element(by.id('submit')).click();

    element(by.id('showQuotes')).click();

    // like quote
    element(by.id('likeQuote')).click();
    var countLike = element(by.id('likes')).getText()
    expect(countLike).toBe('1 like');

    // dislike quote
    element(by.id('disLikeQuote')).click();
    var countDisLike = element(by.id('dislikes')).getText()
    expect(countDisLike).toBe('1 dislike');

  });

  it('should add and edit a quote', function() {

    element(by.model('author')).sendKeys('talabi');
    element(by.model('quoteName')).sendKeys('test quote');
    element(by.model('category')).sendKeys('Love');

    element(by.id('submit')).click();

    element(by.id('showQuotes')).click();

    element(by.id('editQuote')).click();
    var modal = element(by.css('.modal-dialog'));
    browser.wait(EC.visibilityOf(modal),20000);

    element(by.model('editQuote.author')).sendKeys('lllll');
    element(by.model('editQuote.name')).sendKeys(' just added');
    expect(element(by.id('save-button')).isDisplayed()).toBeTruthy();

    element(by.id('save-button')).click();

    element.all(by.repeater('quote in quoteList')).then(function(quote) {
      var quotes = quote[0].element(by.id('new-name'));
      expect(quotes.getText()).toEqual('test quote just added');
    });
  });
});
