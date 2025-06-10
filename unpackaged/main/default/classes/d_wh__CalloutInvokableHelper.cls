/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CalloutInvokableHelper {
    global CalloutInvokableHelper() {

    }
    global static void EnableDelayedDMLs() {

    }
    global static void HandleDelayedDMLs() {

    }
    global static List<d_wh.CalloutInvokableHelper.CalloutResponse> MakeCallouts(d_wh.CalloutInvokableHelper.CalloutRequest requestObj) {
        return null;
    }
global class CalloutRequest {
    global List<Id> recordIds;
    global List<d_wh.CalloutInvokableHelper.InvocableRequest> records;
    global String templateDevName;
    global CalloutRequest(String templateDevName) {

    }
    global CalloutRequest(String templateDevName, List<Id> recordIds) {

    }
    global CalloutRequest(String templateDevName, List<d_wh.CalloutInvokableHelper.InvocableRequest> records) {

    }
}
global class CalloutResponse {
    global Integer code;
    global String response;
}
global class InvocableRequest {
    @InvocableVariable(label='Input Parameters' required=false)
    global String parameters;
    @InvocableVariable(label='Record Id' required=false)
    global Id recordId;
    global InvocableRequest() {

    }
}
}
