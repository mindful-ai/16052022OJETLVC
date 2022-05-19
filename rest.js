define(['knockout', 
'ojs/ojcollectiondataprovider', 
"ojs/ojmodel", 
"ojs/ojtable"], function(ko, CollectionDataProvider, Model){

    function restViewModel(){

        var self = this;

        self.serviceURL = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";

        self.parseData = function(response) {
            return {name: response['name'],
                short_desc: response['short_desc']
            };
        };

        self.Department = Model.Model.extend({
            urlRoot: self.serviceURL,
            parse: self.parseData,
            idAttribute: 'id'
        }); 

        self.myDept = new self.Department();

        self.DeptCollection = Model.Collection.extend({
            url: self.serviceURL + "?limit=50",
            model: self.myDept
        });

        self.DeptCol = ko.observable();
        self.DeptCol(new self.DeptCollection());

        self.datasource = ko.observable();
        self.datasource(new CollectionDataProvider(self.DeptCol()));

    }
    return restViewModel;
})