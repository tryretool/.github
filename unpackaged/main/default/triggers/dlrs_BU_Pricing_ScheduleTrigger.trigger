/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
trigger dlrs_BU_Pricing_ScheduleTrigger on BU_Pricing_Schedule__c
    (before delete, before insert, before update, after delete, after insert, after undelete, after update)
{
    dlrs.RollupService.triggerHandler(BU_Pricing_Schedule__c.SObjectType);
}