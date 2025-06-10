/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class UpdateSlackProfileFlow {
    global UpdateSlackProfileFlow() {

    }
    @InvocableMethod(label='Centro: Get/Set Slack Profile Field')
    global static List<Centro.UpdateSlackProfileFlow.ProfileResult> UserProfileSet(List<Centro.UpdateSlackProfileFlow.UpdateSlackProfileFlowSettings> settings) {
        return null;
    }
global class ProfileResult {
    @InvocableVariable(label='Current Field Value' required=false)
    global String currentFieldValue;
    @InvocableVariable(label='Full Profile Result' required=false)
    global String profile;
    global ProfileResult() {

    }
}
global class UpdateSlackProfileFlowSettings {
    @InvocableVariable(label='Profile Field (https://api.slack.com/types/user#profile or custom field ID)' required=false)
    global String field;
    @InvocableVariable(label='Get Only (do not modify current field value)' required=false)
    global Boolean getOnly;
    @InvocableVariable(label='Run As Slack Member ID (authorization needed)' required=false)
    global String runUserId;
    @InvocableVariable(label='Target Slack Member ID' required=false)
    global String userId;
    @InvocableVariable(label='Set Field Value' required=false)
    global String value;
    global UpdateSlackProfileFlowSettings() {

    }
}
}
