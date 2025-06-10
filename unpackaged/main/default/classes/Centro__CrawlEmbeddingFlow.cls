/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CrawlEmbeddingFlow {
    global CrawlEmbeddingFlow() {

    }
    @InvocableMethod(label='Ask Grok: Create embedding by scraping a URL')
    global static List<Centro.CrawlEmbeddingFlow.GrokResult> CrawlEmbedding(List<Centro.CrawlEmbeddingFlow.GrokSettings> settings) {
        return null;
    }
    @Future(callout=true)
    global static void processFuture(Id embeddingId, String crawlUrl) {

    }
global class GrokResult {
    @InvocableVariable(label='Grok Embedding Id' required=false)
    global Id embeddingId;
    global GrokResult() {

    }
}
global class GrokSettings {
    @InvocableVariable(label='Scrape from URL (ie html or pdf url)' required=true)
    global String crawlUrl;
    @InvocableVariable(label='Knowledge Topic Name' required=true)
    global String topicName;
    @InvocableVariable(label='Display Source URL (update an embedding if exists)' required=true)
    global String url;
    global GrokSettings() {

    }
}
}
