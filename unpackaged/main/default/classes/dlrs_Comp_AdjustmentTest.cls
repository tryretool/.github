/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Comp_AdjustmentTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Comp_AdjustmentTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Comp_Adjustment__c());
    }
}