/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class RenameChannelFlow {
    global RenameChannelFlow() {

    }
    @InvocableMethod(label='Centro: Rename Conversation')
    global static List<Centro.RenameChannelFlow.RenameChannelFlowResult> RenameChannel(List<Centro.RenameChannelFlow.RenameChannelFlowSetting> settings) {
        return null;
    }
global class RenameChannelFlowResult {
    global RenameChannelFlowResult() {

    }
}
global class RenameChannelFlowSetting {
    @InvocableVariable(label='Channel Id (Note Channel must be created by Centro)' required=true)
    global String ChannelId;
    @InvocableVariable(label='Renamed Channel Name' required=true)
    global String ChannelName;
    global RenameChannelFlowSetting() {

    }
}
}
