/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class AddReactionFlow {
    global AddReactionFlow() {

    }
    @InvocableMethod(label='Centro: Emoji react to a message')
    global static void AddReaction(List<Centro.AddReactionFlow.AddRectionSettings> settings) {

    }
global class AddRectionSettings {
    @InvocableVariable(label='Channel Id' required=true)
    global String channelId;
    @InvocableVariable(label='Emoji name' required=true)
    global String emojiName;
    @InvocableVariable(label='React to message TS' required=true)
    global String messageTs;
    @InvocableVariable(label='Remove reaction' required=false)
    global Boolean removeReaction;
    global AddRectionSettings() {

    }
}
}
