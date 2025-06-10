/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Partner_LeadTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Partner_LeadTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Partner_Lead__c());
    }
}