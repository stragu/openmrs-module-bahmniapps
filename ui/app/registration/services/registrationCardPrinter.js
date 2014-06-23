'use strict';

angular.module('bahmni.registration')
    .factory('registrationCardPrinter', ['printer', 'appService', function (printer, appService) {
        //TODO: Have only one printer function and take the layout as an argument
        var print = function (patient) {
            var templatePath = appService.getAppDescriptor().getConfigValue("registrationCardPrintLayout") || "views/nolayoutfound.html";
            printer.print(templatePath, {patient: patient});
        };

        var printSupplementalPaper = function(patient) {
            var templatePath = appService.getAppDescriptor().getConfigValue("supplementalPaperPrintLayout") || "views/nolayoutfound.html";
            printer.print(templatePath, {patient: patient, today: new Date()});
        }
        return {
            print: print,
            printSupplementalPaper: printSupplementalPaper
        };
    }]);
