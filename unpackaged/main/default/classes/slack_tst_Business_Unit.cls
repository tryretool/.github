@isTest
public class slack_tst_Business_Unit {
	@isTest 
	static void testTrigger() {
		Account obj1 = new Account(
			Name = 's'
		);
		insert obj1;

		Business_Unit__c obj0 = new Business_Unit__c(
			Account__c = obj1.Id
		);
		insert obj0;
	}
}