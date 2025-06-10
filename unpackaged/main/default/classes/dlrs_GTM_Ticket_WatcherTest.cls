/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_GTM_Ticket_WatcherTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_GTM_Ticket_WatcherTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new GTM_Ticket_Watcher__c());
    }
}