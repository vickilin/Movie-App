describe('Results Controller', function(){
    var results ={
Search: [
{
Title: "Star Wars: Episode IV - A New Hope",
Year: "1977",
imdbID: "tt0076759",
Type: "movie",
Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
},
{
Title: "Star Wars: Episode V - The Empire Strikes Back",
Year: "1980",
imdbID: "tt0080684",
Type: "movie",
Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg"
},
{
Title: "Star Wars: Episode VI - Return of the Jedi",
Year: "1983",
imdbID: "tt0086190",
Type: "movie",
Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BODllZjg2YjUtNWEzNy00ZGY2LTgyZmQtYTkxNDYyOWM3OTUyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}
],
totalResults: "397",
Response: "True"
};

    var $controller;
    var $location;
    var $q;
    var $rootScope;
    var $scope;
    var omdbApi;
    var $exceptionHandler;

    beforeEach(module('omdb'));
    beforeEach(module('movieApp'));

    beforeEach(module(function($exceptionHandlerProvider){
        $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(inject(function(_$controller_, _$location_,  _$q_, _$rootScope_, _$exceptionHandler_, _omdbApi_){
        $controller = _$controller_;
        $location = _$location_;
        $scope ={};
        $q = _$q_;
        $rootScope = _$rootScope_;
        $exceptionHandler = _$exceptionHandler_;
        omdbApi = _omdbApi_;
    }));

    it('should load search results', function(){
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', {$scope: $scope });
        $rootScope.$apply();
        expect($scope.results[0].Title).toBe(results.Search[0].Title);
        expect($scope.results[1].Title).toBe(results.Search[1].Title);
        expect($scope.results[2].Title).toBe(results.Search[2].Title);
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    });

    it('should set result status to error', function(){
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.reject('Something went wrong!');
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', {$scope: $scope });
        $rootScope.$apply();
        console.log($exceptionHandler.errors);
        expect($exceptionHandler.errors).toEqual(['Something went wrong!']);
    });
});