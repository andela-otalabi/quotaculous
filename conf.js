// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/quotaculous.js'],
   onPrepare: function(){
    global.EC = protractor.ExpectedConditions;
  }
};

