var orderApp = angular.module('orderApp', ['ngRoute']);

orderApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/customers.html'
  })
  .when('/orders', {
    templateUrl: 'partials/orders.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});

orderApp.factory('customerFactory', function (){
  var customers = [
      {name: 'Peter Something', created_at: new Date(1990, 2, 29).getTime()},
      {name: 'Morgan Wright', created_at: new Date(1989, 4, 19).getTime()},
      {name: 'Nick McCrory', created_at: new Date(1994, 6, 20).getTime()}
    ];

  var factory = {};

  factory.getCustomers = function(callback){
    callback(customers);
  }
  return factory;
})

orderApp.factory('orderFactory', function (){
  var factory = {};
  var orders = [];

  factory.getOrders = function(callback){
    callback(orders);
  }
  return factory;
})

orderApp.controller('customersController', function (customerFactory){
  var that = this;
  that.customers = [];
  customerFactory.getCustomers(function(data){
    that.customers = data;
  })

  that.addCustomer = function (){
    if(that.newCustomer.name == undefined){
      return false;
      // console.log(that.newCustomer.name);
    }
    that.errors = null;
    that.newCustomer.created_at = new Date().toDateString();
      for(var idx in that.customers){
       if(that.customers[idx].name == that.newCustomer.name){
          that.errors = "Name has already been added";
          that.newCustomer = {};
          return false;
        }
      }
      // var customer = {name:$scope.newCustomer.name, created_at: new Date().toDateString()};
      that.customers.push(that.newCustomer);
      that.newCustomer = {};   
    }
    that.removeCustomer = function (customer){
      that.customers.splice(that.customers.indexOf(customer), 1);
    }

});

orderApp.controller('ordersController', function (orderFactory){
  var that = this;
  that.orders = [];

    orderFactory.getOrders(function(data){
      that.orders = data;

      that.addOrder = function (){
        that.newOrder.date= new Date().toDateString();
        that.orders.push(that.newOrder);
        that.newOrder= {};
      }
      that.removeOrder = function (order){
        that.orders.splice(that.orders.indexOf(order), 1);
      }
    })
})
