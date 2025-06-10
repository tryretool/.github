/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
@RestResource(urlMapping='/Burst/*')
global class Burst {
    global static Map<String,Map<String,Schema.DisplayType>> sObjectFieldTypeMap;
    global Burst() {

    }
    @HttpPost
    global static String doDelete(List<Id> ids) {
        return null;
    }
    @HttpPut
    global static String doInsert(List<LeanData.Burst.SFObject> records) {
        return null;
    }
    @HttpPatch
    global static String doUpsert(String sObjectName, String externalField, List<LeanData.Burst.SFObject> records) {
        return null;
    }
global class FeatureAbsentException extends Exception {
}
global class IncorrectArgumentsException extends Exception {
}
global class SFObject {
    global Map<String,String> attributes;
    global String sObjectName;
    global SFObject() {

    }
    global SFObject(String sObjectName, Map<String,String> attributes) {

    }
    global void setSObjectName(String sObjectName) {

    }
    global SObject toSObject() {
        return null;
    }
}
}
