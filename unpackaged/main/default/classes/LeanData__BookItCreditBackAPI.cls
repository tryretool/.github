/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class BookItCreditBackAPI {
    global BookItCreditBackAPI() {

    }
    @InvocableMethod(label='requestBookItCreditBack')
    global static List<LeanData.BookItCreditBackAPI.BookItCreditBackInvocableRequest> callBookItAPI(List<LeanData.BookItCreditBackAPI.BookItCreditBackInvocableRequest> reqs) {
        return null;
    }
    global static void processCreditBack(Id objectId, String reason) {

    }
    global static void validateEvent(Id objectId) {

    }
global class BookItCreditBackInvocableRequest {
    @InvocableVariable(label='Object Id' required=true)
    global Id objectId;
    @InvocableVariable(label='Process' required=true)
    global String process;
    @InvocableVariable(label='Credit Back Reason' required=false)
    global String reason;
    @InvocableVariable(label='API Response' required=false)
    global String status;
    global BookItCreditBackInvocableRequest() {

    }
}
}
