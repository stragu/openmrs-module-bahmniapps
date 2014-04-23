Bahmni.Opd.DocumentUpload.DocumentImage = function(data){
    angular.extend(this, data);
    this.title = this.getTitle();
};

Bahmni.Opd.DocumentUpload.DocumentImage.prototype = {
    getTitle: function() {
        var titleComponents = [];
        if(this.concept) {
            titleComponents.push(this.concept.name);
        }        
        if(this.obsDatetime) {
            titleComponents.push(moment(this.obsDatetime).format(Bahmni.Common.Constants.dateDisplayFormat));
        }
        return titleComponents.join(', ');
    }
};
