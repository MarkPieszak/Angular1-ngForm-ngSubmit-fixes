var module = angular.module('ngFormFixes', []);

module.directive('ngForm', function ($parse) {
    return {
        link: linkFunction
    };

    function linkFunction ($scope, $element, $attrs) {

        var $submit_button = findSubmitButton();

        $element.bind('keydown', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                if ($attrs.ngSubmit) {
                    $parse($attrs.ngSubmit)($scope);
                    return;
                }
                if ($submit_button) {
                    $submit_button.click();
                }
            }
        });

        angular.element($submit_button).bind('click', function (e) {
            if ($attrs.ngSubmit && angular.element(this).attr('ng-click') === undefined) {
                $parse($attrs.ngSubmit)($scope);
                return;
            }
        });

        function findSubmitButton () {
            var $buttons = [$element.find('button'), $element.find('input')];

            for (var i = 0; i < $buttons.length; i++) {
                for (var n = 0; n < $buttons[i].length; n++) {
                    var $current = $buttons[i][n];
                    if ($current.type.toLowerCase() === 'submit') {
                        return $current;
                    }

                }
            }
        }
    }

});

module.directive('onEnter', ['$parse', function ($parse) {
    return {
        link: function ($scope, $element, $attrs) {

            $element.bind('keyup', function (e) {
                var keyCode = e.keyCode || e.which;

                if (keyCode === 13 && $attrs.onEnter) {
                    $parse($attrs.onEnter)($scope);
                }

            });
        }
    };
}]);
