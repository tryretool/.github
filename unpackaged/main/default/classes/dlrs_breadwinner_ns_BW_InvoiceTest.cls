/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_breadwinner_ns_BW_InvoiceTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_breadwinner_ns_BW_InvoiceTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new breadwinner_ns__BW_Invoice__c());
    }
}