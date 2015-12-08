'use strict';

angular.module('bahmni.admin')
    .controller('FormBuilderController', ['$scope',
        function ($scope) {
            var formElementTypes = [{ type:'Text'}, {type: 'Numeric'}, {type: 'Sub Form'}];
            $scope.formElementTypes = formElementTypes.slice();
            $scope.sortableOptionsForElementType = {
                connectWith: ".form-container",
                update: function (e, ui) {
                     $scope.formElementTypes = formElementTypes.slice();
                }
            };
            $scope.form = {
                display: "Vitals",
                isSet: true,
                formElements: [
                    {
                        name: "Pulse",
                        datatype: "numeric",
                        display: "Pulse",
                        absoluteHigh: 78,
                        absoluteLow: 87,
                        units: "/Min",
                        uiControls: {
                            "stepper": true,
                            "required": true
                        }
                    },
                    {
                        name: "History Notes",
                        datatype: "text",
                        display: "History Notes",
                        uiControls: {
                            "conciseText": true,
                            "required": true
                        }

                    },
                    {
                        display: "Blood Pressure",
                        isSet: true,
                        formElements: [
                            {
                                name: "BP notes",
                                datatype: "text",
                                display: "BP Notes",
                                uiControls: {
                                    "conciseText": true,
                                    "required": true
                                }

                            }
                        ]
                    }
                ]
            }
        }]);