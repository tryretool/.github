@isTest
private class AccountTriggerHelper_Test {
    @testSetup
    public static void setup(){
        Account acc1 = new Account(name = 'tom1');
        insert acc1;
        
        Account acc2 = new Account(name = 'tom2', ParentId = acc1.Id);
        insert acc2;
        
        Account acc3 = new Account(name = 'tom3', ParentId = acc2.Id);
        insert acc3;
        
        Account acc4 = new Account(name = 'tom4', ParentId = acc3.Id);
        insert acc4;
        
        Account acc5 = new Account(name = 'tom5');
        insert acc5;
        
    }
    
    @isTest
    private static void ownerIdInsert_Test() {
        Account acc1 = [Select Id, Name FROM Account WHERE Name = 'tom1'];
        Account acc2 = [Select Id, Ultimate_Parent_Account__c, Name FROM Account WHERE Name = 'tom2'];
        Account acc3 = [Select Id, Ultimate_Parent_Account__c, Name FROM Account WHERE Name = 'tom3'];
        Account acc4 = [Select Id, Ultimate_Parent_Account__c, Name FROM Account WHERE Name = 'tom4'];
		Test.startTest();
        System.assertEquals(acc1.id, acc2.Ultimate_Parent_Account__c);
        Test.stopTest();
    }
    
    @isTest
    private static void ownerIdUpdate_Test() {
		Account acc1 = [Select Id, Name FROM Account WHERE Name = 'tom1'];
        Account acc2 = [Select Id, Ultimate_Parent_Account__c, Name FROM Account WHERE Name = 'tom2'];
        Account acc3 = [Select Id, Ultimate_Parent_Account__c, Name FROM Account WHERE Name = 'tom3'];
        Account acc4 = [Select Id, Ultimate_Parent_Account__c, Name FROM Account WHERE Name = 'tom4'];
        Account acc5 = [Select Id, Name FROM Account WHERE Name = 'tom5'];
        Test.startTest();
        acc2.ParentId =  acc5.Id;
        Update acc2;
        System.assertEquals(acc3.Ultimate_Parent_Account__c, acc2.Ultimate_Parent_Account__c);
        Test.stopTest();
    }
    
    @isTest
    private static void ownerIdDelete_Test() {
		Account acc1 = [Select Id, Name FROM Account WHERE Name = 'tom1'];
        Account acc2 = [Select Id, Ultimate_Parent_Account__c, Name FROM Account WHERE Name = 'tom2'];
        Account acc3 = [Select Id, Ultimate_Parent_Account__c, Name FROM Account WHERE Name = 'tom3'];
        Account acc4 = [Select Id, Ultimate_Parent_Account__c, Name FROM Account WHERE Name = 'tom4'];
        Account acc5 = [Select Id, Name FROM Account WHERE Name = 'tom5'];
        Test.startTest();
        Delete acc1;
        System.assertEquals(acc3.Ultimate_Parent_Account__c, acc4.Ultimate_Parent_Account__c);
        Test.stopTest();
    }
}