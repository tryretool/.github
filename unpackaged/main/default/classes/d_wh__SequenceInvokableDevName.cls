/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class SequenceInvokableDevName {
    global SequenceInvokableDevName() {

    }
    @InvocableMethod(label='Invoke Callout Sequence (Using Developer Name)' description='Start a callout sequence using Declarative Webhook. Provide the sequence Develoepr Name and a main record Id.')
    global static List<Id> InvokeCallout(List<d_wh.SequenceInvokableDevName.SequenceRequest> reqs) {
        return null;
    }
global class SequenceRequest {
    @InvocableVariable(label='Callout Sequence Developer Name' required=true)
    global String developerName;
    @InvocableVariable(label='Record Id' required=true)
    global Id recordId;
    global SequenceRequest() {

    }
}
}
