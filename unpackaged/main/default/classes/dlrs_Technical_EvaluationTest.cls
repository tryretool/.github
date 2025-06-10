/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Technical_EvaluationTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Technical_EvaluationTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Technical_Evaluation__c());
    }
}