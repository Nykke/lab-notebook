angular
  .module("noteBook", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory("NoteBookFactory", [
    "$resource",
    NoteBookFactoryFunction
  ])
  .controller("NoteBookIndexController", [
    "NoteBookFactory",
    NoteBookIndexControllerFunction
  ])
  .controller("NoteBookShowController", [
    "$stateParams",
    "NoteBookFactory",
    NoteBookShowControllerFunction
  ])


  function Router ($stateProvider) {
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
    .state("index", {
      url: "/notebooks",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "NoteBookIndexController",
      controllerAs: "vm"
    })
    .state("show", {
      utl: "/notebooks/:title",
      templateUrl: "/assets/js/ng-views/show.html",
      controller: "NoteBookShowController",
      controllerAs: "vm"
    })
  }

  function NoteBookFactoryFunction($resource){
    return $resource( "/api/notebooks/:title", {}, {
      update: { method: "PUT" }
    })
  }

  function NoteBookIndexControllerFunction( NoteBookFactory ){
    this.notebooks = NoteBookFactory.query();
  }

  function NoteBookShowControllerFunction ($stateParams, NoteBookFactory ){
    this.notebooks = NoteBookFactory.get({title: $stateParams.title})
  }
