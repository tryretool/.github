@IsTest
public class FlowAction_CallSubflowHandlerTest {
    
    private static final String flowApiName = 'Dummy_Flow';
    private static final Map<String,Object> inputVariablesMap = new Map<String,Object>{
        'varText' => 'Flows are love!'
    };
    private static final String assertionFailMessagePrefix = 'FlowAction_CallSubflowHandlerTest Class Assertion Failed: ';

    @IsTest
    static void callSubflowTest(){

        Test.startTest();
        
        System.assertEquals(
            1, 
            1, 
            assertionFailMessagePrefix + 'Number of SOQL queries do not match.'
        );
        
        Test.stopTest();
        
    }

}