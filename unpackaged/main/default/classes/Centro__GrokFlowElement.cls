/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class GrokFlowElement {
    global GrokFlowElement() {

    }
    @InvocableMethod(label='Centro: Grok Summarize a Conversation')
    global static List<Centro.GrokFlowElement.GrokResult> GrokConversation(List<Centro.GrokFlowElement.GrokSettings> settings) {
        return null;
    }
global class GrokResult {
    @InvocableVariable(label='Grok Summary' required=false)
    global String Summary;
    @InvocableVariable(label='Conversation Transcript' required=false)
    global String Transcript;
    global GrokResult() {

    }
}
global class GrokSettings {
    @InvocableVariable(label='Channel Id' required=true)
    global String channelId;
    @InvocableVariable(label='Limit to message or thread TS' required=false)
    global String messageTs;
    @InvocableVariable(label='Custom prompt (leave blank for default summary)' required=false)
    global String promptOverride;
    @InvocableVariable(label='Max response length in words. (Default: 200 max 3000)' required=false)
    global Integer responseTokens;
    @InvocableVariable(label='Enable Grok AI Summary (false to return transcript only)' required=true)
    global Boolean summarize;
    global GrokSettings() {

    }
}
}
