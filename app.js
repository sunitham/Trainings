// init angular app
var app = angular
  .module('myApp', [])
  .service('noty', ['$rootScope', function( $rootScope ) {
    
    var queue = [];
            
    return {
      queue: queue,
      add: function( item ) {
      	queue.push(item);
      	setTimeout(function(){
          // remove the alert after 2000 ms
          $('.alerts .alert').eq(0).remove();
          queue.shift();
        },2000);
      },
      pop: function(){
        return this.queue.pop();       
      }
    };
  }])
  .controller('ctrlApp', [ 'noty', '$scope', function( noty, $scope ) {
	$scope.noty = noty; // notify service
    
    /* test notify */
    noty.add({title:'Welcome',body:'Hello. This is an alert message'});
    
  }]);
  

// jquery functions and plugins
$(document).ready(function(){
  
  var scope = angular.element($('#myApp')).scope();
  
  // hook into angular noty service from Bootstrap jquery event
  $('.collapse').on('hide.bs.collapse',function(){
    scope.$apply(function(){
    	scope.noty.add({type:'danger',title:'Hey!',body:'That panel was just collapsed.'});
    });
  });
  
  $('#btn1').on('click',function(){
    scope.$apply(function(){
    	scope.noty.add({type:'warning',title:'Wow',body:'You`re a really good button clicker!'});
    });
  });
  
});
