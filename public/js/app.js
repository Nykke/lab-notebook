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
  .controller("NoteBookNewController", [
    "$state",
    "NoteBookFactory",
    NoteBookNewControllerFunction
  ])
  .controller("NoteBookShowController", [
    "$state",
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
    .state("new", {
      url:"/notebooks/new",
      templateUrl: "/assets/js/ng-views/new.html",
      controller: "NoteBookNewController",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/notebooks/:title",
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

  function NoteBookNewControllerFunction($state, NoteBookFactory){
    this.notebook = new NoteBookFactory()
    this.create = function(){
      this.notebook.$save().then(function(notebook){
        $state.go("show", {title: notebook.title})
      })
    }
  }

  function NoteBookShowControllerFunction ($state, $stateParams, NoteBookFactory ){
    this.notebook = NoteBookFactory.get({title: $stateParams.title})
    this.update = function () {
      this.notebook.$update({title: $stateParams.title})
    }
    this.destroy = function (){
      this.notebook.$delete({title: $stateParams.title}).then(function(){
        $state.go("index")
      })
    }
  }
