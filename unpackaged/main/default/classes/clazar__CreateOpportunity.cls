/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CreateOpportunity {
    global CreateOpportunity() {

    }
    @InvocableMethod(label='Create Co-Sell Opportunity')
    global static List<clazar.CreateOpportunity.OutputParameters> bulkInvoke(List<clazar.CreateOpportunity.InputParameters> inputs) {
        return null;
    }
global class InputParameters {
    @InvocableVariable(label='Cloud' description='Default is aws: choices are aws, azure, gcp' required=true)
    global String cloud;
    @InvocableVariable(label='Opportunity Data' description='Opportunity data' required=true)
    global String opportunityData;
    @InvocableVariable(label='Salesforce Opportunity' required=true)
    global Opportunity record;
    @InvocableVariable(label='Submit to Cloud' description='If false, then Draft opportunity will be created in Clazar.' required=true)
    global Boolean submitToCloud;
    global InputParameters() {

    }
}
global class OutputParameters {
    @InvocableVariable(label='Clazar Opportunity Id' description='Clazar Opportunity Id, used to update the opportunity in the future.' required=false)
    global String clazarId;
    @InvocableVariable(label='Opportunity Record' description='Opportunity record created in Clazar for submission.' required=false)
    global String opportunityRecord;
    global OutputParameters() {

    }
}
}
