/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
trigger dlrs_OpportunityTrigger on Opportunity
    (before delete, before insert, before update, after delete, after insert, after undelete, after update)
{
    if(Label.Toggle_for_dlrs_Opportunity_Trigger.equalsIgnoreCase('TRUE')){
    dlrs.RollupService.triggerHandler(Opportunity.SObjectType);
    }
}