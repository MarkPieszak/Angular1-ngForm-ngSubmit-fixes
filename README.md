# ngForm-handle-Enter-Keypress

### Choose what the Enter key does in any given area in Angular - run any scoped function you want

Helpful with `<ng-form>` tags since they don't automatically handle Enter keys for submitting the form.
This can also be used anywhere to simply run a specific function on the scope that's passed into the attribute.

>  Check out demo.html to see it in action

### ngForm directive useage: (Automatically calls any input/button with type="submit")

    APP.directive('ngForm', function ($parse) {
        return {
            link: function ($scope, $element, $attrs) {

                $element.bind('keyup', function (e) {

                    var keyCode = e.keyCode || e.which;

                    if (keyCode === 13) {
                        $element.find('[type="submit"]').click();
                    }

                });
            }
        };
    });

# Specifically tell Angular what to call when Enter is pressed in a form

### Basic useage: (Specify what you want Enter to call)

    <div on-enter="vmMyCtrl.runSomething()">
        <!-- now any input item within this area will call "runSomething()" when Enter is pressed -->
        <input placeholder="Some textbox" />
    </div>

### The directive itself (short & sweet)

    APP.directive('onEnter', ['$parse', function ($parse) {
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
