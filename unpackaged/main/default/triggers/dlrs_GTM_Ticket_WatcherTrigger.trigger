/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
trigger dlrs_GTM_Ticket_WatcherTrigger on GTM_Ticket_Watcher__c
    (before delete, before insert, before update, after delete, after insert, after undelete, after update)
{
    dlrs.RollupService.triggerHandler(GTM_Ticket_Watcher__c.SObjectType);
}