/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class GetOpportunityMappedData {
    global GetOpportunityMappedData() {

    }
    @InvocableMethod(label='Get Opportunity Mapped Data')
    global static List<clazar.GetOpportunityMappedData.OutputParameters> bulkInvoke(List<clazar.GetOpportunityMappedData.InputParameters> inputs) {
        return null;
    }
global class InputParameters {
    @InvocableVariable(label='Clazar Opportunity Id' description='Clazar Id is required to update the existing opportunity.' required=false)
    global String clazarId;
    @InvocableVariable(label='Cloud' description='Default is aws. Possible values: aws, azure, gcp' required=true)
    global String cloud;
    @InvocableVariable(label='Salesforce Opportunity' required=true)
    global Opportunity record;
    @InvocableVariable(label='Update Existing Opportunity' description='Update existing opportunity with mapped data' required=true)
    global Boolean updateExistingOpportunity;
    global InputParameters() {

    }
}
global class OutputParameters {
    @InvocableVariable(label='Opportunity Data' description='Opportunity data' required=false)
    global String opportunityData;
    global OutputParameters() {

    }
}
}
