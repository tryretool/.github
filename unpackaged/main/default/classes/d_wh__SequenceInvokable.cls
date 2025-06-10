/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class SequenceInvokable {
    global SequenceInvokable() {

    }
    @InvocableMethod(label='Invoke Callout Sequence (Using Sequence Id)' description='Start a callout sequence using Declarative Webhook. Provide the sequence Id and a main record Id.')
    global static List<Id> InvokeCallout(List<d_wh.SequenceInvokable.SequenceRequest> reqs) {
        return null;
    }
global class SequenceRequest {
    @InvocableVariable(label='Record Id' required=true)
    global Id recordId;
    @InvocableVariable(label='Callout Sequence Id' required=true)
    global Id sequenceId;
    global SequenceRequest() {

    }
}
}
