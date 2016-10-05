'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('phoneDetail').
  component('phoneDetail', {
    templateUrl: 'views/phone-detail/phone-detail.template.html',
    controller: ['Phone', '$routeParams',
      function PhoneDetailController(Phone, $routeParams) {
        var self = this;

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };

		self.phone = Phone.get({'id': $routeParams.phoneId}, function(phone) {
          self.setImage(phone.images[0].img);
        }); 
      }
    ]
  });
