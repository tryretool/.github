/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class ArchiveChannelFlow {
    global ArchiveChannelFlow() {

    }
    @InvocableMethod(label='Centro: Archive Conversation')
    global static List<Centro.ArchiveChannelFlow.ArchiveChannelFlowResult> ArchiveChannel(List<Centro.ArchiveChannelFlow.ArchiveChannelFlowSetting> settings) {
        return null;
    }
global class ArchiveChannelFlowResult {
    global ArchiveChannelFlowResult() {

    }
}
global class ArchiveChannelFlowSetting {
    @InvocableVariable( required=true)
    global String ChannelId;
    @InvocableVariable(label='Unarchive (private channels only due to Slack limitation)' required=false)
    global Boolean Unarchive;
    global ArchiveChannelFlowSetting() {

    }
}
}
