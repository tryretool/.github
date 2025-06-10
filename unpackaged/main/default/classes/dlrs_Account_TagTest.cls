/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Account_TagTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Account_TagTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Account_Tag__c());
    }
}