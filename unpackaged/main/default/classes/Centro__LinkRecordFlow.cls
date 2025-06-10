/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class LinkRecordFlow {
    global LinkRecordFlow() {

    }
    @InvocableMethod(label='Centro: Link/Unlink Record to Conversation')
    global static List<Centro.LinkRecordFlow.LinkRecordFlowResult> LinkRecord(List<Centro.LinkRecordFlow.LinkRecordFlowSetting> settings) {
        return null;
    }
global class LinkRecordFlowResult {
    global LinkRecordFlowResult() {

    }
}
global class LinkRecordFlowSetting {
    @InvocableVariable( required=true)
    global String ChannelId;
    @InvocableVariable(label='Message or Thread TS' required=false)
    global String MessageTs;
    @InvocableVariable( required=true)
    global String RecordId;
    @InvocableVariable(label='Message or Thread Name (displayed in LWC)' required=false)
    global String ThreadName;
    @InvocableVariable( required=false)
    global Boolean Unlink;
    global LinkRecordFlowSetting() {

    }
}
}
