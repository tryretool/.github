/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_breadwinner_ns_BW_CompanyTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_breadwinner_ns_BW_CompanyTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new breadwinner_ns__BW_Company__c());
    }
}