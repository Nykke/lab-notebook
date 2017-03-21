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
    "$state",
    "NoteBookFactory",
    NoteBookIndexControllerFunction
  ])

  function Router ($stateProvider) {
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
    .state("index", {
      url: "/notebooks",
      templateUrl: "/assets/js/ng.views/index.html",
      controller: "NoteBookIndexController",
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
