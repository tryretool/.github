/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global virtual class CustomInterface {
    global CustomInterface() {

    }
    global virtual Map<String,Object> additionalParametersMap() {
        return null;
    }
    global virtual void batchCompleteCallback() {

    }
    global virtual List<SObject> customFilter(SObject primary, List<SObject> matchedSObjects, String parameter) {
        return null;
    }
    global virtual Map<String,Map<String,Object>> customInterfaceLogMap() {
        return null;
    }
    global virtual Map<String,Object> customNotificationRule(SObject primary, Map<String,SObject> chosenSObjects, String parameter, Map<String,Object> additionalParameters) {
        return null;
    }
    global virtual Map<String,Object> customRoutingRuleForBookit(SObject primary, String parameter, Map<String,Object> additionalParameters) {
        return null;
    }
    global virtual List<SObject> customRoutingRule(SObject primary, List<SObject> secondaries, String arg) {
        return null;
    }
    global virtual String customRoutingRule(SObject candidate, List<SObject> matchedLeadList, List<SObject> matchedAccountList, String arg) {
        return null;
    }
    global virtual String customRoutingRule(SObject primary, Map<String,SObject> chosenSObjects, String parameter) {
        return null;
    }
    global virtual String customRoutingRule(SObject primary, Map<String,SObject> chosenSObjects, String parameter, Map<String,Object> additionalParameters) {
        return null;
    }
    global virtual String customRoutingRule(SObject primary, String parameter, Map<String,Object> additionalParameters) {
        return null;
    }
    global virtual List<SObject> customTiebreakerRule(SObject primary, List<SObject> matchedSObjects, String parameter) {
        return null;
    }
    global static Map<String,Object> datatableRoutingForCustomInterface(Id datasetId, Map<String,Object> inColumnMappedValues, List<Map<String,Object>> outputMappings, Map<String,Object> additionalParameters) {
        return null;
    }
    global virtual Set<String> getCustomAccountFields() {
        return null;
    }
    global virtual Set<String> getCustomContactFields() {
        return null;
    }
    global virtual Map<String,Map<String,Object>> getCustomInterfaceVariableMap() {
        return null;
    }
    global virtual Set<String> getCustomLeadFields() {
        return null;
    }
    global virtual Map<String,Object> getCustomNotificationOptions() {
        return null;
    }
    global virtual Map<String,Set<String>> getCustomQueryFields() {
        return null;
    }
    global virtual Id getLeadOwnerIdFromChosenAccount(Lead candidateLead, Account chosenAccount) {
        return null;
    }
    global virtual Id getLeadOwnerIdFromChosenAccount(Lead candidateLead, Account chosenAccount, String nodeName) {
        return null;
    }
    global virtual Id getLeadOwnerIdFromChosenLead(Lead candidateLead, Lead chosenLead) {
        return null;
    }
    global virtual Id getLeadOwnerIdFromChosenLead(Lead candidateLead, Lead chosenLead, String nodeName) {
        return null;
    }
    global virtual Map<String,List<String>> getMapOfCustomInterfaceNodeNamesToEdges() {
        return null;
    }
    global static Id getMappedOwner(SObject sobj, String mapName) {
        return null;
    }
    global static Object getVariable(String variableName) {
        return null;
    }
    global static Map<String,Object> populateMeetingActionsForm(String routingType, Id ownerId, Map<String,Object> customParameter) {
        return null;
    }
    global virtual void postAssignmentCallback(Map<String,Object> parameterMap) {

    }
    global virtual void postProcessAllTriggeredLeads(List<Lead> leads) {

    }
    global virtual void preRoutingCallback(List<Lead> candidateLeads, List<Lead> matchedLeads, List<Account> matchedAccounts) {

    }
    global virtual void processUnroutedLead(Lead lead) {

    }
    global virtual void processUnroutedLeads(List<Lead> leads) {

    }
    global virtual void setVariable(String variableName, Object value) {

    }
    global virtual Map<Id,Object> userAvailabilityMap() {
        return null;
    }
}
