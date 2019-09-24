(function() {
    // These are the constraints used to validate the form
    var constraints = {
        email: {
            // Email is required
            // presence: true,
            presence:{
                allowEmpty: false,
                message:  "^Can not be empty."
            },
            // and must be an email (duh)
            email:{
                message: "^Must be a valid email address" } //true,

        },
        name: {
            presence:{
                allowEmpty: false,
                message:  "^Can not be empty."
            },
        },
        plusOne: {
            // And must be at least 5 characters long
            length: {
                minimum: 1
            }
        }
        ,attendance: {
            // You also need to input where you live
            presence:{
                allowEmpty: false,
                message:  "^Please tell us if you can come."
            },
            // And we restrict the countries supported to Sweden
            inclusion: {
                within: ["yes","no"],
                // The ^ prevents the field name from being prepended to the error
                message:  "^Please tell us if you can come."
            }
        },
        childrenNumber: {
            // You don't have to input the number of children but it you do
            // you need to input an integer > 0
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 0
            }
        },
        message:{
            presence: false
        }
    };

    // Hook up the form so we can prevent it from being posted


    document.getElementById('rsvp').addEventListener('submit', function(ev) {
            ev.preventDefault();
            handleFormSubmit(this);
        });

    function handleFormSubmit(form) {
        // First we gather the values from the form
        var values = validate.collectFormValues(form);
        // then we validate them against the constraints
        var errors = validate(values, constraints);
        // then we update the form to reflect the results
        showErrors(form, errors || {});
        // And if all constraints pass we let the user know
        if (!errors) {
            showSuccess();
        }
    }

    // Updates the inputs with the validation errors
    function showErrors(form, errors) {
        // We loop through all the inputs and show the errors for that input
        _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
            showErrorsForInput(input, errors && errors[input.name]);
        });
    }

    // Shows the errors for a specific input
    function showErrorsForInput(input, errors) {
        // This is the root of the input
        var formGroup = closestParent(input.parentNode, "form-group")
            // Find where the error messages will be insert into
            , messages = formGroup.querySelector(".error-message");

        // First we remove any old messages and resets the classes
        resetFormGroup(formGroup);
        // If we have errors
        if (errors) {
            _.each(errors, function(error) {
                addError(messages, error);
            });
        }
    }

    // Recusively finds the closest parent that has the specified class
    function closestParent(child, className) {
        if (!child || child == document) {
            return null;
        }
        if (child.classList.contains(className)) {
            return child;
        } else {
            return closestParent(child.parentNode, className);
        }
    }

    function resetFormGroup(formGroup) {
        // Clear Error messages
        _.each(formGroup.querySelectorAll(".error-message"), function(el) {
            el.innerHTML ="";
        });
        // Remove the separator
        _.each(formGroup.querySelectorAll(".error-message-separator"), function(el) {
            el.parentNode.removeChild(el);
        });
    }


    function addError(messages, error) {
        // Add the separator be
        var separator = document.createElement("span");
        separator.classList.add("error-message-separator");
        separator.classList.add("title");
        separator.innerHTML = " - ";
        messages.parentNode.insertBefore(separator, messages);

        // Set the error message
        messages.innerHTML = error;
    }

})();