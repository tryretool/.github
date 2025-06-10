/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
@RestResource(urlMapping='/LeanDataAPI/*')
global class LeanDataAPI {
    global LeanDataAPI() {

    }
    global static void buStamping(List<SObject> objectsToStamp) {

    }
    @InvocableMethod(label='LeanDataAPI')
    global static List<LeanData.LeanDataAPI.LeanDataApiInvocableRequest> callLeanDataApi(List<LeanData.LeanDataAPI.LeanDataApiInvocableRequest> reqs) {
        return null;
    }
    global static Lead findDuplicateLead(Map<String,Object> params) {
        return null;
    }
    global static Map<String,Object> findMatches(String operation, Map<String,Object> params) {
        return null;
    }
    global static Account findRelatedAccount(Map<String,Object> params) {
        return null;
    }
    global static Map<String,Object> invokeMethod(Map<String,Object> params) {
        return null;
    }
    global static Map<String,Object> oneTimeRouting(Map<String,Object> params) {
        return null;
    }
    @HttpPost
    global static String restPost() {
        return null;
    }
    global static Map<String,Object> roundRobinAPI(Map<String,Object> params) {
        return null;
    }
    global static void triggerRouting() {

    }
global class LeanDataApiInvocableRequest {
    @InvocableVariable(label='API Name' required=true)
    global String apiName;
    @InvocableVariable(label='Object Id' required=true)
    global Id objectId;
    @InvocableVariable(label='API parameters' required=true)
    global String serializedParameters;
    global LeanDataApiInvocableRequest() {

    }
}
}
