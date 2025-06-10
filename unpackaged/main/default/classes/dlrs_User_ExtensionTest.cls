/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_User_ExtensionTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_User_ExtensionTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new User_Extension__c());
    }
}