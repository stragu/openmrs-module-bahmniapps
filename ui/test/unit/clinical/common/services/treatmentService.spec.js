'use strict';

describe("TreamentService", function () {
    var _$http;
    var treatmentService;

    beforeEach(module('bahmni.clinical'));
    
    beforeEach(module(function () {
        _$http = jasmine.createSpyObj('$http', ['get']);
        
    }));

    beforeEach(module(function ($provide) {
        $provide.value('$http', _$http);
        $provide.value('$q', Q);
    }));


    beforeEach(inject(['TreatmentService', function (TreatmentService) {
        this.treatmentService = TreatmentService;
    }]));

    describe("treatment Service", function () {
        it('should fetch ActiveDrugOrders for a patient', function (done) {
            _$http.get.and.callFake(function () {
                return {success: function(fn) {return fn(drugOrders)}};
            });

            this.treatmentService.getActiveDrugOrders("123").then(function (response) {
                expect(response).toEqual(drugOrders);
                done();
            });
        });

        it('should fetch prescribed drug orders for the patient', function (done) {
            
            _$http.get.and.callFake(function () {
                return {success: function(fn) {return fn(drugOrders)}};
            });
            this.treatmentService.getPrescribedDrugOrders("patientuuid", "numberOfVisits", "getOtherActive").then(function (response) {
                expect(response).toEqual(drugOrders);
                done();
            });
        });

        it('should fetch config for treatment', function (done) {
            _$http.get.and.callFake(function () {
                return specUtil.respondWith({"data": config});
            });
            
            this.treatmentService.getConfig().then(function (response) {
                expect(response.data).toBe(config);
                done();
            });
        });

    });

    var drugOrders = [
            {
              "action": "NEW",
              "uuid": "3279ccd2-9e57-4a4f-a79a-66e1538ea6c6",
              "instructions": null,
              "dosingInstructions": {
                "route": "Inhalation",
                "dose": 10,
                "doseUnits": "ml",
                "frequency": "Once a day",
                "asNeeded": false,
                "quantity": 100,
                "quantityUnits": "Unit(s)",
                "administrationInstructions": "{\"instructions\":\"Immediately\"}",
                "numberOfRefills": null
              },
              "durationUnits": "Day(s)",
              "visit": {
                "uuid": "9e5018b5-6dd6-4e46-b317-800d0c3a2e06",
                "startDateTime": 1421739207000
              },
              "autoExpireDate": 1422610737000,
              "scheduledDate": null,
              "dateStopped": null,
              "dateActivated": 1421746737000,
              "commentToFulfiller": null,
              "orderNumber": "ORD-998",
              "careSetting": "Outpatient",
              "orderType": "Drug Order",
              "effectiveStartDate": 1421746737000,
              "effectiveStopDate": 1422610737000,
              "drug": {
                "form": "Inhaler",
                "strength": null,
                "uuid": "191d09b9-fbcf-4333-8c00-d708ccd7ae88",
                "name": "Ipratropium Pressurised"
              },
              "orderAttributes": null,
              "dosingInstructionType": "org.openmrs.module.bahmniemrapi.drugorder.dosinginstructions.FlexibleDosingInstructions",
              "previousOrderUuid": null,
              "orderReasonConcept": null,
              "orderReasonText": null,
              "duration": 10,
              "provider": {
                "uuid": "35ba3170-cf80-4749-9672-b3b678c77b6a",
                "name": "superman"
              }
            }
    ];

    var config = {
      "dosingInstructions": [
        {
          "rootConcept": null,
          "name": "Before meals"
        }
      ],
      "durationUnits": [
        {
          "rootConcept": null,
          "name": "Day(s)"
        }
      ],
      "doseUnits": [
        {
          "rootConcept": null,
          "name": "Tablet(s)"
        }
      ],
      "dispensingUnits": [
        {
          "rootConcept": null,
          "name": "Jelly"
        }
      ],
      "orderAttributes": [],
      "frequencies": [
        {
          "uuid": "25667b55-17b7-11e4-be87-005056821db0",
          "frequencyPerDay": 1,
          "name": "Once a day"
        }
      ],
      "routes": [
        {
          "rootConcept": null,
          "name": "Intramuscular"
        }
      ]
    };
});

