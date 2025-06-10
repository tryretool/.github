/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global virtual class Reporting_CustomInterface {
    global Reporting_CustomInterface() {

    }
    global virtual Map<String,Object> buildOppCampaignMemberQuery(Map<String,Object> params) {
        return null;
    }
    global virtual String buildOppCampaignMemberQuery(Map<Id,LeanData.Reporting_OpportunityAttribution.OpportunityMetricWrapper> oppWrapperMap, Date earliestOpportunityCreateDate, Map<Id,Set<Id>> oppToPossibleWhoIds, Map<Id,Set<Id>> oppToPossibleWhatIds, Map<Id,List<Id>> accountToOpportunitiesMap, Set<Id> contactsWithRoleIds, Set<Id> relatedContactIds, Set<Id> relatedLeadIds, Map<Id,Set<Id>> leadContactIdToOpportunities, Map<Id,Map<Id,String>> contactToOppToRoleMap, Map<Id,Map<Id,String>> contactToAccRoleMap, Map<String,Set<String>> accToRelatedLeadContactsMap, Map<String,List<LeanData.Reporting_OpportunityAttribution.opportunityStageHistory>> oppStageHistoryMap, LeanData.Reporting_Utility.Reporting_Context Reporting_Context) {
        return null;
    }
    global virtual Database.QueryLocator buildOppQueryLocator(LeanData.Reporting_Utility.Reporting_Context Reporting_Context) {
        return null;
    }
    global virtual Map<String,Object> buildOppQueryLocator(Map<String,Object> params) {
        return null;
    }
    global virtual Boolean determineCampaignMemberRelevance(Map<Id,LeanData.Reporting_OpportunityAttribution.OpportunityMetricWrapper> oppWrapperMap, Boolean valid, CampaignMember campaignMember, Opportunity opp, Datetime relevantCampaignMemberDateTime, Date relevantCampaignMemberDate, Date opportunityCreateDate, Date opportunityCloseDate, LeanData.Reporting_Utility.Reporting_Context Reporting_Context) {
        return null;
    }
    global virtual Map<String,Object> determineCampaignMemberRelevance(Map<String,Object> params) {
        return null;
    }
    global virtual List<SObject> oppMTPostHandler(Map<Id,LeanData.Reporting_OpportunityAttribution.OpportunityMetricWrapper> oppWrapperMap, List<SObject> newMarketingTouches, LeanData.Reporting_Utility.Reporting_Context Reporting_Context) {
        return null;
    }
    global virtual Map<String,Object> oppMTPostHandler(Map<String,Object> params) {
        return null;
    }
    global virtual Map<String,Object> oppPreparationHandler(Map<Id,LeanData.Reporting_OpportunityAttribution.OpportunityMetricWrapper> oppWrapperMap, Date earliestOpportunityCreateDate, Map<Id,Set<Id>> oppToPossibleWhoIds, Map<Id,Set<Id>> oppToPossibleWhatIds, Map<Id,List<Id>> accountToOpportunitiesMap, Set<Id> oppIds, Boolean preSalesPostSalesOn, LeanData.Reporting_Utility.Reporting_Context Reporting_Context) {
        return null;
    }
    global virtual Map<String,Object> oppPreparationHandler(Map<String,Object> params) {
        return null;
    }
    global virtual Map<String,Object> postMTInsertHandler(Map<String,Object> params) {
        return null;
    }
    global virtual void postMTInsertHandler(List<SObject> newMarketingTouches, List<SObject> scope, LeanData.Reporting_Utility.Reporting_Context Reporting_Context) {

    }
    global virtual void postSCMTHandler(Map<String,Object> params) {

    }
    global virtual Map<String,Object> touchesPreSerializationHandler(Map<String,Object> params) {
        return null;
    }
}
