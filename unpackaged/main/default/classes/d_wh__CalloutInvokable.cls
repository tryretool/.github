/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CalloutInvokable {
    global CalloutInvokable() {

    }
    @InvocableMethod(label='Invoke Callout (Using Template Id)' description='Make a callout using Declarative Webhook. Provide the template Id and a main record Id.')
    global static void InvokeCallout(List<d_wh.CalloutInvokable.CalloutRequest> reqs) {

    }
global class CalloutRequest {
    @InvocableVariable(label='Input Parameters' required=false)
    global String parameters;
    @InvocableVariable(label='Record Id' required=true)
    global Id recordId;
    @InvocableVariable(label='Callout Template Id' required=true)
    global Id templateId;
    global CalloutRequest() {

    }
}
}
