@isTest
public class AutoConvertsLeads_Test {
    @testSetup static void testData(){
        Lead l = new Lead(Company = 'Test Lead',
                          LastName = 'Lead Last Name'
                         );
        insert l;
        Account acc = new Account(Name='Test Acc');
        insert acc;
        
    }
    @isTest
    public static void convertLeadsTest(){
        Lead l = [Select id from Lead where Company ='Test Lead'];
        Account acc =[Select id from Account limit 1];
        List<AutoConvertsLeads.ConvertLeadActionRequest> lst = new List <AutoConvertsLeads.ConvertLeadActionRequest>();
        AutoConvertsLeads.ConvertLeadActionRequest ls = new AutoConvertsLeads.ConvertLeadActionRequest();
        ls.leadid = l.id;
        ls.accountId = acc.id;
        lst.add(ls);
        Test.startTest();
        AutoConvertsLeads.convertLeads(lst);
        Test.stopTest();
        LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
        Lead convertedlead = [Select id,Status from Lead where Company ='Test Lead'];
        System.assertEquals(convertStatus.MasterLabel,convertedlead.Status);
        
    }

}