/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class AORUpdateInvocable {
    global AORUpdateInvocable() {

    }
    @InvocableMethod(label='LeanData Routing Update Trigger' description='Reference LeanData's Help Center to learn how to setup Routing Triggers')
    global static void callLeanDataApi(List<LeanData.AORUpdateInvocable.AORUpdateInvocableRequest> requests) {

    }
global class AORUpdateInvocableRequest {
    @InvocableVariable(label='Record Reference' required=true)
    global SObject objectReference;
    @InvocableVariable(label='Record Prior Reference' required=true)
    global SObject objectReferencePrior;
    global AORUpdateInvocableRequest() {

    }
}
}
