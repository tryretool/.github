/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
trigger dlrs_Retool_Air_Gapped_LicenseTrigger on Retool_Air_Gapped_License__c
    (before delete, before insert, before update, after delete, after insert, after undelete, after update)
{
    dlrs.RollupService.triggerHandler(Retool_Air_Gapped_License__c.SObjectType);
}