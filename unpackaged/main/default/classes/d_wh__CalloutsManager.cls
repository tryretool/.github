/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class CalloutsManager {
    global CalloutsManager() {

    }
    global static void HandleDelayedDMLs() {

    }
    global static d_wh.CalloutsManager.CalloutResponse MakeCallout(Id templateId) {
        return null;
    }
    global static d_wh.CalloutsManager.CalloutResponse MakeCallout(Id templateId, Id recordId) {
        return null;
    }
    @Future(callout=true)
    global static void MakeCalloutAsync(Id templateId) {

    }
    @Future(callout=true)
    global static void MakeCalloutAsync(Id templateId, Id recordId) {

    }
    @Future(callout=true)
    global static void MakeCalloutAsyncDN(String templateDevName) {

    }
    @Future(callout=true)
    global static void MakeCalloutAsyncDN(String templateDevName, Id recordId) {

    }
    @Future(callout=true)
    global static void MakeCalloutAsyncDN(String templateDevName, Id recordId, Map<String,String> parameters) {

    }
    @Future(callout=true)
    global static void MakeCalloutAsyncDN(String templateDevName, List<Id> recordIds) {

    }
    @Future(callout=true)
    global static void MakeCalloutAsyncDN(String templateDevName, List<Id> recordIds, Map<String,String> parameters) {

    }
    @Future(callout=true)
    global static void MakeCalloutAsyncDN(String templateDevName, Map<String,String> parameters) {

    }
    @Future(callout=true)
    global static void MakeCalloutAsync(Id templateId, Id recordId, Map<String,String> parameters) {

    }
    @Future(callout=true)
    global static void MakeCalloutAsync(Id templateId, List<Id> recordIds) {

    }
    global static d_wh.CalloutsManager.CalloutResponse MakeCalloutDN(String templateDevName) {
        return null;
    }
    global static d_wh.CalloutsManager.CalloutResponse MakeCalloutDN(String templateDevName, Id recordId) {
        return null;
    }
    global static d_wh.CalloutsManager.CalloutResponse MakeCalloutDN(String templateDevName, Id recordId, Map<String,String> parameters) {
        return null;
    }
    global static d_wh.CalloutsManager.CalloutResponse MakeCalloutDN(String templateDevName, List<Id> recordIds) {
        return null;
    }
    global static d_wh.CalloutsManager.CalloutResponse MakeCalloutDN(String templateDevName, List<Id> recordIds, Map<String,String> parameters) {
        return null;
    }
    global static d_wh.CalloutsManager.CalloutResponse MakeCalloutDN(String templateDevName, Map<String,String> parameters) {
        return null;
    }
    global static d_wh.CalloutsManager.CalloutResponse MakeCallout(Id templateId, List<Id> recordIds) {
        return null;
    }
    global static void ScheduleFeatureParametersSyncNow() {

    }
    global static void SetDelayDMLs(Boolean delayed) {

    }
    global static d_wh.CalloutsManager.SequenceResponse StartCalloutSequence(Id sequenceId, Id recordId) {
        return null;
    }
    global static d_wh.CalloutsManager.SequenceResponse StartCalloutSequenceDN(String sequenceDevName, Id recordId) {
        return null;
    }
    global static void SyncFeatureParameters() {

    }
    global static void setMock(System.HttpCalloutMock mock) {

    }
global class CalloutResponse {
    global String calloutBody {
        get;
        set;
    }
    global List<d_wh.CalloutsManager.RequestHeader> calloutHeaders {
        get;
        set;
    }
    global Id calloutLogId {
        get;
        set;
    }
    global String calloutMethod {
        get;
        set;
    }
    global String calloutResponseBody {
        get;
        set;
    }
    global Integer calloutResponseCode {
        get;
        set;
    }
    global String calloutURL {
        get;
        set;
    }
    global String preCalloutBody {
        get;
        set;
    }
    global List<d_wh.CalloutsManager.RequestHeader> preCalloutHeaders {
        get;
        set;
    }
    global Id preCalloutLogId {
        get;
        set;
    }
    global String preCalloutMethod {
        get;
        set;
    }
    global String preCalloutResponseBody {
        get;
        set;
    }
    global Integer preCalloutResponseCode {
        get;
        set;
    }
    global String preCalloutURL {
        get;
        set;
    }
    global List<SObject> updatedRecs {
        get;
        set;
    }
}
global class RequestHeader {
    global String name {
        get;
        set;
    }
    global String value {
        get;
        set;
    }
}
global class SequenceResponse {
    global Id SequenceLogId {
        get;
        set;
    }
}
}
