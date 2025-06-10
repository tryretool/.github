/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class AddGrokEmbeddingFlow {
    global AddGrokEmbeddingFlow() {

    }
    @InvocableMethod(label='Ask Grok: Add/Remove Grok Knowledge')
    global static List<Centro.AddGrokEmbeddingFlow.GrokResult> AddGrokEmbedding(List<Centro.AddGrokEmbeddingFlow.GrokSettings> settings) {
        return null;
    }
global class GrokResult {
    @InvocableVariable(label='Error' required=false)
    global String error;
    @InvocableVariable(label='External Id Integer' required=false)
    global Integer externalId;
    @InvocableVariable(label='External Id String' required=false)
    global String externalIdStr;
    @InvocableVariable(label='Model Name' required=false)
    global String modelName;
    global GrokResult() {

    }
}
global class GrokSettings {
    @InvocableVariable(label='Content Text or Html' required=false)
    global String content;
    @InvocableVariable(label='Remove existing knowledge with this URL. Default false.' required=false)
    global Boolean remove;
    @InvocableVariable(label='Knowledge Topic Name' required=true)
    global String topicName;
    @InvocableVariable(label='Source URL or Record Id (update if exists)' required=true)
    global String url;
    global GrokSettings() {

    }
}
}
