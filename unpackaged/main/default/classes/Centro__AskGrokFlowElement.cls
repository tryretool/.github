/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class AskGrokFlowElement {
    global AskGrokFlowElement() {

    }
    @InvocableMethod(label='Ask Grok: Ask a Question')
    global static List<Centro.AskGrokFlowElement.GrokResult> AskGrokQuestion(List<Centro.AskGrokFlowElement.GrokSettings> settings) {
        return null;
    }
global class GrokResult {
    @InvocableVariable(label='Answer' required=false)
    global String answer;
    @InvocableVariable(label='Relevancy Score' required=false)
    global Integer relevancyScore;
    @InvocableVariable(label='Session Id' required=false)
    global String sessionId;
    @InvocableVariable(label='Source URLs' required=false)
    global List<String> sourceUrls;
    global GrokResult() {

    }
}
global class GrokSettings {
    @InvocableVariable(label='Enable Grok Role Topics for running user' required=false)
    global Boolean enableRoles;
    @InvocableVariable(label='Question' required=true)
    global String question;
    @InvocableVariable(label='Max response length in words. (Default: 400 max 16,384)' required=false)
    global Integer responseTokens;
    @InvocableVariable(label='Static Topic Names (delimited by ";", leave blank for global model or for user role topics)' required=false)
    global String topicName;
    global GrokSettings() {

    }
}
}
