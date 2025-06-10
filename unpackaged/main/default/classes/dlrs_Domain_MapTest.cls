/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Domain_MapTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Domain_MapTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Domain_Map__c());
    }
}