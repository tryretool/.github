/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
@RestResource(urlMapping='/LeanData/*')
global class LeanData {
    global LeanData() {

    }
    webService static String abortContinuousActivities() {
        return null;
    }
    @ReadOnly
    webService static String addLogCountsToMap() {
        return null;
    }
    @ReadOnly
    webService static String addSobjectCountsToMap() {
        return null;
    }
    webService static String ccScheduling() {
        return null;
    }
    webService static String cleanupLogs(Integer jobId) {
        return null;
    }
    webService static String cleanupMatches(Integer jobId) {
        return null;
    }
    webService static List<String> convertLeadsWithAccountIds(List<Id> leadIds, List<Id> accountIds, String convertedStatus, Boolean createOpportunity) {
        return null;
    }
    webService static String convertLeads(List<Id> leadIds, String convertedStatus) {
        return null;
    }
    webService static String deleteJobSetting(Integer jobId, String key) {
        return null;
    }
    webService static String deleteSobjects(List<String> uploadLeads) {
        return null;
    }
    webService static Double getDoubleSetting(Integer jobId, String key) {
        return null;
    }
    webService static Integer getIntegerSetting(Integer jobId, String key) {
        return null;
    }
    webService static List<String> getJobSettings(Integer jobId) {
        return null;
    }
    webService static Long getLongSetting(Integer jobId, String key) {
        return null;
    }
    webService static String getStringSetting(Integer jobId, String key) {
        return null;
    }
    webService static String reassignLeads(String assignmentRule, String condition) {
        return null;
    }
    @HttpPost
    global static String restPost() {
        return null;
    }
    webService static String restartLDScheduler() {
        return null;
    }
    webService static String storeStopWords(List<LeanData.LeanData.StopWord> words) {
        return null;
    }
    webService static String updateJobSetting(Integer jobId, String key, String value) {
        return null;
    }
    webService static String updateSetting(Integer jobId, String key, String value, String authenticationKey) {
        return null;
    }
    webService static String version() {
        return null;
    }
global class CheckOnDemandAllowedSchedulable implements System.Schedulable {
    global CheckOnDemandAllowedSchedulable() {

    }
    global void execute(System.SchedulableContext sc) {

    }
}
global class StopWord {
    @WebService
    webService String word;
    global StopWord() {

    }
}
}
