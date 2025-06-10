/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CalloutInvokableDevName {
    global CalloutInvokableDevName() {

    }
    @InvocableMethod(label='Invoke Callout (Using Developer Name)' description='Make a callout using Declarative Webhook. Provide the template Developer Name and a main record Id.')
    global static void InvokeCallout(List<d_wh.CalloutInvokableDevName.CalloutRequest> reqs) {

    }
global class CalloutRequest {
    @InvocableVariable(label='Callout Template Developer Name' required=true)
    global String developerName;
    @InvocableVariable(label='Input Parameters' required=false)
    global String parameters;
    @InvocableVariable(label='Record Id' required=true)
    global Id recordId;
    global CalloutRequest() {

    }
}
}
