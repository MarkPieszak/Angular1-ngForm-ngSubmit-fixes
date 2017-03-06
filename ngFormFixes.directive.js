'use strict';

(function() {
  angular
    .module('ngFormFixes', [])
    .directive('ngForm', ['$parse', '$timeout', function($parse, $timeout) {
      return {
        link: linkFunction
      };

      function linkFunction($scope, $element, $attrs) {

        var submitButton = findSubmitButton();

        // bind Enter key
        $element.bind('keydown', function(e) {
          var keyCode = e.keyCode || e.which;
          if (keyCode === 13) {
            var nodeType = e.target.nodeName.toLowerCase();
            if (nodeType === 'input') {
              if ($attrs.ngSubmit) {
                $parse($attrs.ngSubmit)($scope, {
                  $event: e
                });
                e.stopPropagation();
                e.preventDefault();
              } else if (submitButton) {
                submitButton.click();
                e.stopPropagation();
                e.preventDefault();
              }
            }
          }
        });

        // bind Submit click to run itself or ngSubmit
        angular.element(submitButton).bind('click', function(e) {
          if ($attrs.ngSubmit && angular.element(this).attr('ng-click') === undefined) {
            $parse($attrs.ngSubmit)($scope, {
              $event: e
            });
            e.stopPropagation();
            e.preventDefault();

            $timeout(function() {
              if ($scope[$attrs.ngForm || $attrs.name]) {
                $scope[$attrs.ngForm || $attrs.name].$submitted = true;
              }
              $element.addClass('ng-submitted');
            });
          }
        });

        // internal
        function findSubmitButton() {
          var $buttons = [$element.find('button'), $element.find('input')];

          for (var i = 0; i < $buttons.length; i++) {
            for (var n = 0; n < $buttons[i].length; n++) {
              var $current = $buttons[i][n];
              if ($current.getAttribute('type') && $current.getAttribute('type').toLowerCase() === 'submit') {
                return $current;
              }

            }
          }
        }
      }

    }])

  .directive('onEnter', ['$parse', function($parse) {
    return {
      link: function($scope, $element, $attrs) {

        $element.bind('keyup', function(e) {

          var keyCode = e.keyCode || e.which;

          if (keyCode === 13 && $attrs.onEnter) {
            $parse($attrs.onEnter)($scope, {
              $event: e
            });
          }

        });
      }
    };
  }]);
})();