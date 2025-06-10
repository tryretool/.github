/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class MA_RunConfigInvocable {
    global MA_RunConfigInvocable() {

    }
    @InvocableMethod(label='MAS: Run Mass Action' description='Submits background job to run a Mass Action Configuration.')
    global static List<dca_mass_action.MA_RunConfigInvocable.Response> execute(List<dca_mass_action.MA_RunConfigInvocable.Request> requests) {
        return null;
    }
global class Request {
    @InvocableVariable(label='Configuration ID' description='The Salesforce record ID of the Mass Action Configuration to run. Specify this or the Unique Name.' required=false)
    global Id configId;
    @InvocableVariable(label='Configuration Unique Name' description='The unique name of the Mass Action Configuration to run. Specify this or the ID.' required=false)
    global String configUniqueName;
    global Request() {

    }
}
global class Response {
    @InvocableVariable(label='Job ID' description='The ID of the background apex job processing the Mass Action request.' required=false)
    global Id jobId;
    global Response() {

    }
}
}
