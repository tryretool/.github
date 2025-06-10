/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class UpdateOpportunity {
    global UpdateOpportunity() {

    }
    @InvocableMethod(label='Update Co-Sell Opportunity')
    global static List<clazar.UpdateOpportunity.OutputParameters> bulkInvoke(List<clazar.UpdateOpportunity.InputParameters> inputs) {
        return null;
    }
global class InputParameters {
    @InvocableVariable(label='Clazar Opportunity Id' description='Clazar Id of the opportunity' required=true)
    global String clazarId;
    @InvocableVariable(label='Cloud' description='Default is aws. Possible values: aws, azure, gcp' required=true)
    global String cloud;
    @InvocableVariable(label='Opportunity Data' description='Opportunity data' required=true)
    global String opportunityData;
    global InputParameters() {

    }
}
global class OutputParameters {
    @InvocableVariable(label='Opportunity Record' description='Opportunity record updated in Clazar.' required=false)
    global String opportunityRecord;
    global OutputParameters() {

    }
}
}
