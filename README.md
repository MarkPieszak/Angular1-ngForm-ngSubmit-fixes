# Angular 1.* ng-form & ng-submit fixes.

### Fix `<ng-form>` Enter keypress & `<ng-submit>` functionality to work the way `<form>` tags do!

> With no jQuery dependency!

## [DEMO : View it in Action!](http://markpieszak.github.io/Angular1-ngForm-ngSubmit-fixes/)

#### Choose what the Enter key does in any given area in Angular - run any scoped function you want

Helpful with `<ng-form>` tags since they don't automatically handle Enter keys for submitting the form.
This can also be used anywhere to simply run a specific function on the scope that's passed into the attribute.

>  Check out demo.html to see it in action

#### ngForm directive useage: (Automatically calls any input/button with type="submit")

    <ng-form>
        <!-- some inputs -->
        <button type="submit"
            ng-click="vmDemo.submitThisForm()">
            Submit Button
        </button>
    </ng-form>

#### ngSubmit functionality fix for ngForm:

    <ng-form ng-submit="vmDemo.submitThisForm()">
        <!-- some inputs -->
        <button type="submit">
            Submit Button
        </button>
    </ng-form>


#### Handle Enter keypress on any parent item:

    <div on-enter="vmDemo.submitThisForm()">
        <!-- some inputs -->
        <button type="submit"
            ng-click="vmDemo.submitThisForm()">
            SAVE
        </button>
    </div>
