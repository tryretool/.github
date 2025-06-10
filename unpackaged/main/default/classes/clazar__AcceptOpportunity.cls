/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class AcceptOpportunity {
    global AcceptOpportunity() {

    }
    @InvocableMethod(label='Accept Inbound Co-Sell Opportunity')
    global static List<clazar.AcceptOpportunity.OutputParameters> bulkInvoke(List<clazar.AcceptOpportunity.InputParameters> inputs) {
        return null;
    }
global class InputParameters {
    @InvocableVariable(label='Accept Opportunity' description='Accept the inbound opportunity' required=true)
    global Boolean acceptOpportunity;
    @InvocableVariable(label='Clazar Opportunity Id' description='Clazar Id of the opportunity' required=true)
    global String clazarId;
    @InvocableVariable(label='Cloud' description='Default is aws. Possible values: aws, azure, gcp' required=true)
    global String cloud;
    @InvocableVariable(label='Reject Opportunity Reason' description='Reason for rejecting the opportunity. Required if Reject Opportunity is set to true. Possible Values: Customer problem unclear, Next steps unclear, Unable to support, Duplicate of Partner Referral, Renewal opportunity, Other' required=false)
    global String rejectOpportunityReason;
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
