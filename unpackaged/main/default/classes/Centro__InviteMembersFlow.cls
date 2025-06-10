/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class InviteMembersFlow {
    global InviteMembersFlow() {

    }
    @InvocableMethod(label='Centro: Invite/Remove users to existing conversation')
    global static List<Centro.InviteMembersFlow.InviteMembersResult> InviteMembers(List<Centro.InviteMembersFlow.InviteMembersFlowSetting> settings) {
        return null;
    }
global class InviteMembersFlowSetting {
    @InvocableVariable(label='Channel Id' required=true)
    global String channelId;
    @InvocableVariable(label='Invite collection of Emails via Slack Connect' required=false)
    global List<String> inviteEmails;
    @InvocableVariable(label='Invite collection of Salesforce, Slack or Microsoft Teams User IDs (default current User)' required=false)
    global List<String> inviteUserIds;
    @InvocableVariable(label='Remove users (default false)' required=false)
    global Boolean removeUsers;
    global InviteMembersFlowSetting() {

    }
}
global class InviteMembersResult {
    @InvocableVariable(label='Error Message' required=false)
    global String error;
    @InvocableVariable(label='Invitation URL' required=false)
    global String inviteURL;
    global InviteMembersResult() {

    }
}
}
