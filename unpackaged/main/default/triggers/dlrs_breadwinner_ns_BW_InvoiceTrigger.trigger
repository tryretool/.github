/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
trigger dlrs_breadwinner_ns_BW_InvoiceTrigger on breadwinner_ns__BW_Invoice__c
    (before delete, before insert, before update, after delete, after insert, after undelete, after update)
{
    dlrs.RollupService.triggerHandler(breadwinner_ns__BW_Invoice__c.SObjectType);
}