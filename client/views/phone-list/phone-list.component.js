'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'views/phone-list/phone-list.template.html',
    controller: function PhoneListController(Phone) {
      var self = this;
      self.orderProp = 'age';

      /*$http.get('api/phones').then(function(response) {
        self.phones = response.data;
      });
	  */
	  self.phones = Phone.getAll({}, function(phones) {
          //self.setImage(phone.images[0].img);
        }); 
    }
  });
