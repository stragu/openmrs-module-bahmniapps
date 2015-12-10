'use strict';

angular.module('bahmni.admin')
    .controller('FormBuilderController', ['$scope',
        function ($scope) {
            $scope.formElementTypes = [
                {
                    type: 'Text'
                },
                {
                    type: 'Numeric'
                },
                {
                    type: 'Sub Form'
                }
            ];

            $scope.sortableOptionsForElementType = {
                connectWith: ".form-container",
                //revert: true, for animation
                stop: function (e, ui) {
                    if( ui.item.sortable.source.hasClass('element-types') &&
                        ui.item.sortable.droptarget &&
                        ui.item.sortable.droptarget != ui.item.sortable.source &&
                        ui.item.sortable.droptarget.hasClass('form-container')){

                        var modelToBeRestored = angular.copy(ui.item.sortable.model);
                        $scope.formElementTypes.splice(ui.item.sortable.index, 0, modelToBeRestored);

                        var targetModelList = ui.item.sortable.droptargetModel;
                        for (var index in targetModelList) {
                            targetModelList[index].sortWeight = index;
                        }
                    }
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

                            },
                            {
                                display: "Vitals",
                                isSet: true,
                                formElements: [{
                                    name: "History Notes",
                                    datatype: "text",
                                    display: "History Notes",
                                    uiControls: {
                                        "conciseText": true,
                                        "required": true
                                    }

                                }]
                            }


                        ]
                    }
                ]
            }
        }]);