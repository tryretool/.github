/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Retool_OrgTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Retool_OrgTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Retool_Org__c());
    }
}