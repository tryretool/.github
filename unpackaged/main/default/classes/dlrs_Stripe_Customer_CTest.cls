/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Stripe_Customer_CTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Stripe_Customer_CTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Stripe_Customer__C());
    }
}