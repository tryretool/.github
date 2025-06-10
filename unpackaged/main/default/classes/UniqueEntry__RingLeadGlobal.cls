/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class RingLeadGlobal {
    global RingLeadGlobal(String triggeredObject, Boolean isInsert, Boolean isUpdate) {

    }
    @InvocableMethod(label='Dynamic Trigger Using Flow' description='Send to DMS from Flow')
    global static void sendToDMS(List<UniqueEntry.RingLeadGlobal.DynamicFlowWrapper> sObjectList) {

    }
    global void startExecution(List<SObject> records) {

    }
    global void startExecution(List<SObject> records, List<SObject> recordsOld) {

    }
global class DynamicFlowWrapper {
    @InvocableVariable(label='Records for New Input' description='Records for New Input' required=false)
    global SObject newInput;
    @InvocableVariable(label='new Records bulk' description='Records for New Input' required=false)
    global List<SObject> newInputBulk;
    @InvocableVariable(label='object name' description='trigger object' required=false)
    global String objectName;
    @InvocableVariable(label='Records for Old Input' description='Records for Old Input' required=false)
    global SObject oldInput;
    @InvocableVariable(label='old Records bulk' description='Records for Old Input' required=false)
    global List<SObject> oldInputBulk;
    global DynamicFlowWrapper() {

    }
}
}
