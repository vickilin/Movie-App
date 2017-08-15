describe('Search Controller', function(){
    var $scope;
    var $location;
    var $timeout;
    //var $controller;

    beforeEach(module('movieApp'));
    
    beforeEach(inject(function(_$controller_, _$location_, _$timeout_){
        //$controller = _$controller_;
        $location = _$location_;
        $scope ={};
        $timeout = _$timeout_;
        _$controller_('SearchController', {$scope: $scope, $location: $location, $timeout: $timeout});
       
    }));

    it('should redirect to the query result page for non-empty query', function(){     
        //$this =$controller('SearchController', {$location: $location}, {query:'star wars'});
        $scope.query = 'star wars';
        $scope.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to query results for empty query', function(){
       // $this = $controller('SearchController', {$location: $location}, {query:''});
        $scope.query = '';
        $scope.search();
        expect($location.url()).toBe('');
    });

    it('should redirect after 1 second of keyboard inactivity', function(){
        $scope.query ='star wars';
        $scope.keyup();
        $timeout.flush();
         expect($timeout.verifyNoPendingTasks).not.toThrow();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should cancel timeout in keydown', function(){
        $scope.query ='star wars';
        $scope.keyup();
        $scope.keydown();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });

    it('should cancel timeout on search', function(){
         $scope.query ='star wars';
        $scope.keyup();
        $scope.search();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    })
});