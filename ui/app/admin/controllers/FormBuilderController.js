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
                update: function (e, ui) {
                },
                stop: function (e, ui) {
                    var modelToBeRestored = angular.copy(ui.item.sortable.model);
                    $scope.formElementTypes.splice(ui.item.sortable.index, 0, modelToBeRestored);

                    var targetModelList = ui.item.sortable.droptargetModel;
                    for (var index in targetModelList) {
                        targetModelList[index].sortWeight = index;
                    }
                    /*$scope.getView = function(item) {
                        for (var i in targetModelList) {
                            //console.log(targetModelList[i].type)
                            if(targetModelList[i].type === 'Text') {
                                return '../admin/views/dummyText.html';
                            }
                            else if(targetModelList[i].type === 'Numeric') {
                                return '../admin/views/dummyNumber.html';
                            }
                            return null;
                        }
                    }*/

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