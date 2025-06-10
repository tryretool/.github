/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class ClearCampaignOpportunitiesBatch implements Database.Batchable<SObject>, Database.Stateful {
    global ClearCampaignOpportunitiesBatch(String uMail) {

    }
    global ClearCampaignOpportunitiesBatch(String subject, List<String> bulkCampaignIds, String uMail) {

    }
    global ClearCampaignOpportunitiesBatch(String subject, String selectedCampaignId, List<String> selectedCampaignMemberStatuses, List<String> opportunityTypeExclusions, List<String> bulkCampaignIds, Date startDate, Date endDate, Date startDateOppClose, Date endDateOppClose, List<LeanData.OpportunityStagePrioritySelector> stagePriorityList, List<String> leadStatusExclusions, Integer relevantPreDR, Integer relevantPostDR, Integer relevantPreDROppClose, Integer relevantPostDROppClose, String uMail) {

    }
    global void execute(Database.BatchableContext BC, List<SObject> scope) {

    }
    global void finish(Database.BatchableContext BC) {

    }
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return null;
    }
}
