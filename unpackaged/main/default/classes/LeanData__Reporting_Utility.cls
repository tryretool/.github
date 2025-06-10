/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class Reporting_Utility {
    global static String getReportingQueryFields(String objType, LeanData.Reporting_Utility.Reporting_Context Reporting_Context) {
        return null;
    }
    global static String join(Set<String> strSet, String delimiter) {
        return null;
    }
global class Reporting_Context {
    global String ACCOUNT_TYPE_FIELD;
    global Set<String> allowedCurrencyCodes;
    global String CAMPAIGN_COST_FIELD;
    global String CAMPAIGN_MEMBER_DATE_FIELD;
    global Map<String,Set<String>> campaignMemberStatusByTypeExclusionMap;
    global Map<String,String> campaignMemberToMTMapping;
    global Date campaignStartDate;
    global Map<String,Integer> campaignTypeWeights;
    global Set<String> CLOSED_LOST_STAGES;
    global Set<String> CLOSED_WON_STAGES;
    global Schema.DisplayType CMCreatedDateFieldType;
    global List<String> CUSTOM_STAGES;
    global LeanData.Reporting_CustomInterface customInterface;
    global Set<String> customModelCampaignFields;
    global Map<String,Map<String,Decimal>> customModelFieldToAttributionMap;
    global Map<String,Map<String,String>> customModelFieldToSettingMap;
    global Set<String> customModelMarketingTouchFields;
    global Set<String> customModelMarketingTouchFieldsForCampaign;
    global Set<String> customObjectConditions;
    global Map<String,String> customObjectConditionsMap;
    global Set<String> customObjectFilters;
    global Map<String,String> customObjectFiltersMap;
    global Map<String,Set<String>> customStageSets;
    global Set<String> dataFilterAllowNull;
    global Map<String,Boolean> dataFilterAllowNullMap;
    global Set<String> dataFiltersCategories;
    global Map<String,Set<String>> dataFiltersMap;
    global Set<String> defaultClosedWonStages;
    global String firstOppStageName;
    global Integer fiscalQuarterStart;
    global Integer FTRelevantDayRange;
    global Boolean hasCustomInterface;
    global Boolean hasFTRelevantDayRange;
    global Boolean hasSalesTouchDayRange;
    global Boolean includeBlankStartDate;
    global Boolean includeInactiveCampaignType;
    global Boolean includeInactiveOppStage;
    global Datetime lastRunDate;
    global Integer LTGeneratedRelevantDayRange;
    global List<String> mktTouchFieldList;
    global Set<String> mktTouchFieldSet;
    global String mode;
    global Boolean multiCurrencyOn;
    global Integer numberOfClosedWonOpps;
    global Integer numberOfOpps;
    global String oppBatchMode;
    global Set<Id> oppBatchOppsToRun;
    global Schema.DisplayType oppCloseDateFieldType;
    global Schema.DisplayType oppCreatedDateFieldType;
    global String OPPORTUNITY_AMOUNT_FIELD;
    global String OPPORTUNITY_CLOSEDATE_FIELD;
    global String OPPORTUNITY_CREATED_DATE_FIELD;
    global String OPPORTUNITY_TYPE_FIELD;
    global Date opportunityCloseDate;
    global Date opportunityCreateDate;
    global Map<String,Object> params;
    global Boolean preSalesPostSalesOn;
    global Map<String,LeanData__Quarterly_Metric__c> quarterlyMetrics;
    global String relevantAttribution;
    global Integer relevantDayRange;
    global String relevantFTAttribution;
    global Set<String> Reporting_Switches;
    global Integer salesTouchDayRange;
    global Map<String,Map<String,String>> segmentedCustomObjectConditionsMap;
    global Map<String,Map<String,String>> segmentedCustomObjectFiltersMap;
    global Map<String,Map<String,Set<String>>> segmentedDataFiltersMap;
    global Map<String,Map<String,Map<String,LeanData__Reporting_Setting__c>>> segmentedSettingsMap;
    global Map<String,Map<String,LeanData__Reporting_Setting__c>> settingsMap;
    global Map<String,Boolean> settingSwitches;
    global Map<String,String> stageMapping;
    global Boolean useOppCDSalesTouch;
    global Reporting_Context(String mode) {

    }
    global String objectQueryFilterClause(String objType, Boolean relationalQuery) {
        return null;
    }
}
}
