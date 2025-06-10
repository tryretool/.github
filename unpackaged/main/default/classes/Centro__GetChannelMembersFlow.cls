/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class GetChannelMembersFlow {
    global GetChannelMembersFlow() {

    }
    @InvocableMethod(label='Centro: Get Conversation Members and Info')
    global static List<Centro.GetChannelMembersFlow.GetChannelMembersFlowResult> GetMembers(List<Centro.GetChannelMembersFlow.GetChannelMembersFlowSetting> settings) {
        return null;
    }
global class GetChannelMembersFlowResult {
    @InvocableVariable(label='Conversation Name' required=false)
    global String conversationName;
    @InvocableVariable(label='Is Archived' required=false)
    global Boolean isArchived;
    @InvocableVariable(label='Is Externally Shared' required=false)
    global Boolean isExternal;
    @InvocableVariable(label='Date of most recent message in channel' required=false)
    global Datetime lastActive;
    @InvocableVariable(label='Slack Members' required=false)
    global List<Centro.SlackMember> members;
    global GetChannelMembersFlowResult() {

    }
}
global class GetChannelMembersFlowSetting {
    @InvocableVariable(label='Channel Id' required=true)
    global String channelId;
    global GetChannelMembersFlowSetting() {

    }
}
}
