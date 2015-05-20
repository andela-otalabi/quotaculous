describe('tips directives', function() {

    var element, $scope, doc, $compile;

    beforeEach(inject(function(_$compile_, _$rootScope_, _$document_) {
        $scope = _$rootScope_;
        $compile = _$compile_;
        doc = _$document_;
        var span = angular.element("<div><my-view></my-view></div>");
        element = angular.element(doc[0].body).append(span);
        console.log(span);
        $compile(element)($scope);
        $scope.$digest();
    }));

    it('be able to see this', function() {
        //var tooltip = 'Let intro to the person via email.';
        console.log(element.html());
        //expect((element).html()).toContain("div");
    });
});
