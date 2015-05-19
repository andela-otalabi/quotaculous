/*app.directive('myQuote', function(){
  return {
    template: '"{{quote.name}}" by {{quote.author}} Category: {{quote.category}}'
  };
});*/

app.directive('myView', function(){
  return {
    templateUrl: 'templates/myquote.html'
  };
});