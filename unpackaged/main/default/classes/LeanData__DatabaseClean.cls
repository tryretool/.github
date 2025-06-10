/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
@RestResource(urlMapping='/DatabaseClean/*')
global class DatabaseClean {
    global DatabaseClean() {

    }
    webService static String abortJob(String jobId) {
        return null;
    }
    webService static String cleanupAccountMatches(Integer jobId) {
        return null;
    }
    webService static String cleanupContactMatches(Integer jobId) {
        return null;
    }
    webService static String cleanupLeadMatches(Integer jobId) {
        return null;
    }
    webService static String matchAccounts(Integer jobId, String authenticationKey) {
        return null;
    }
    webService static String matchAccountsSubset(Integer jobId, String condition, String authenticationKey) {
        return null;
    }
    webService static String matchContacts(Integer jobId, String authenticationKey) {
        return null;
    }
    webService static String matchContactsSubset(Integer jobId, String condition, String authenticationKey) {
        return null;
    }
    webService static String matchLeads(Integer jobId, String authenticationKey) {
        return null;
    }
    webService static String matchLeadsSubset(Integer jobId, String condition, String authenticationKey) {
        return null;
    }
    webService static String matchLeadsToContacts(Integer jobId, String authenticationKey) {
        return null;
    }
    webService static String matchUploadRowsToContacts(Integer jobId, String authenticationKey) {
        return null;
    }
    webService static String populateAccountEmailDomains(Integer jobId, String authenticationKey) {
        return null;
    }
    webService static String populateAccountSearchField() {
        return null;
    }
    webService static String populateLeadSearchField() {
        return null;
    }
    @HttpPost
    global static String restPost() {
        return null;
    }
    webService static String scheduleContinuousClean(Integer jobId, String batchType, String authenticationKey) {
        return null;
    }
    webService static String storeConfirmedLeadAccountMatches(List<LeanData.DatabaseClean.leadAccountMatch> lams) {
        return null;
    }
    webService static String triggerContinuousCleanBatch(Integer jobId, String authenticationKey) {
        return null;
    }
global class leadAccountMatch {
    @WebService
    webService String accountSfdcRef;
    @WebService
    webService String leadSfdcRef;
    global leadAccountMatch() {

    }
}
}
