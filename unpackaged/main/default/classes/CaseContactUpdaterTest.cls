@IsTest
public class CaseContactUpdaterTest {
    @IsTest
    static void testUpdateCaseContacts() {
        Account supportAccount = new Account(Name = 'Support Integration');
        insert supportAccount;
        Account domainAccount = new Account(Name = 'Domain Account');
        insert domainAccount;

        Domain_Map__c domainMap = new Domain_Map__c(Name = 'TestExample', Key__c = 'example.com', Matched_Account__c = domainAccount.Id, Domain_Validation__c = 'Confirmed', Domain_Validation_Last_Updated__c = Date.today());
        insert domainMap;

        Domain_Map__c domainMap2 = new Domain_Map__c(Name = 'TestExampleRetool', Key__c = 'retool.com', Matched_Account__c = supportAccount.Id, Domain_Validation__c = 'Confirmed', Domain_Validation_Last_Updated__c = Date.today());
        insert domainMap2;
        Case testCase = new Case(Subject = 'Test Case');
        insert testCase;        CaseContactUpdater.Request req = new CaseContactUpdater.Request();
        req.toEmails = 'user1@example.com,user2@retool.com';
        req.ccEmails = 'user3@example.com,support@retool.com';
        req.caseId = testCase.Id;
        Test.startTest();
        CaseContactUpdater.updateCaseContacts(new List<CaseContactUpdater.Request>{req});
        Test.stopTest();
        List<Contact> contacts = [SELECT Id, Email, AccountId FROM Contact];
        System.assertEquals(3, contacts.size(), 'Three contacts should have been created.');
        for (Contact contact : contacts) {
            if (contact.Email == 'user1@example.com' || contact.Email == 'user3@example.com') {
                System.assertEquals(domainAccount.Id, contact.AccountId, 'Contacts with matching domains should be linked to the correct account.');
            } else if (contact.Email == 'user2@retool.com') {
                System.assertEquals(supportAccount.Id, contact.AccountId, 'Contacts without matching domains should be linked to the Support Integration Account.');
            }
        }
        List<CaseContactRole> caseContactRoles = [SELECT CasesId, ContactId, Role FROM CaseContactRole WHERE CasesId = :testCase.Id];
        System.assertEquals(3, caseContactRoles.size(), 'Three CaseContactRoles should have been created.');

        for (CaseContactRole role : caseContactRoles) {
            Contact contact = [SELECT Email FROM Contact WHERE Id = :role.ContactId LIMIT 1];
            if (contact.Email == 'user2@retool.com') {
                System.assertEquals('Retool', role.Role, 'Retool email addresses should have the Retool role.');
            } else {
                System.assertEquals('Collaborator', role.Role, 'Non-Retool email addresses should have the Collaborator role.');
            }
        }
    }
    @IsTest
    static void testGetCaseToContactRoleMap_EmptySet() {
        Set<Id> emptyCaseIds = new Set<Id>();
        Test.startTest();
        Map<Id, List<Id>> result = CaseContactUpdater.getCaseToContactRoleMap(emptyCaseIds);
        Test.stopTest();
        System.assertNotEquals(null, result, 'Result map should not be null even if set is empty');
        System.assertEquals(0, result.size(), 'Should return empty map for empty case IDs');
    }
    @IsTest
    static void testUpdateCaseContactsWithExistingRoles() {
        Account supportAccount = new Account(Name = 'Support Integration');
        insert supportAccount;
        Account domainAccount = new Account(Name = 'Domain Account');
        insert domainAccount;

        Domain_Map__c domainMap = new Domain_Map__c(Name = 'TestExample', Key__c = 'example.com', Matched_Account__c = domainAccount.Id, Domain_Validation__c = 'Confirmed', Domain_Validation_Last_Updated__c = Date.today());
        insert domainMap;

        Domain_Map__c domainMap2 = new Domain_Map__c(Name = 'TestExampleRetool', Key__c = 'retool.com', Matched_Account__c = supportAccount.Id, Domain_Validation__c = 'Confirmed', Domain_Validation_Last_Updated__c = Date.today());
        insert domainMap2;
        Case testCase = new Case(Subject = 'Test Case');
        insert testCase;        CaseContactUpdater.Request req = new CaseContactUpdater.Request();
        req.toEmails = 'user1@example.com,user2@retool.com';
        req.ccEmails = 'user3@example.com,support@retool.com';
        req.caseId = testCase.Id;
        Contact con = new Contact();
        con.LastName = 'Test Contact';
        con.Email = 'user2@retool.com';
        insert con;
        CaseContactRole ccr = new CaseContactRole(
                        CasesId = testCase.Id,
                        ContactId = con.Id,
                        Role = 'Retool'
                    );
        insert ccr;
        Test.startTest();
        CaseContactUpdater.updateCaseContacts(new List<CaseContactUpdater.Request>{req});
        Test.stopTest();
        List<Contact> contacts = [SELECT Id, Email, AccountId FROM Contact];
        System.assertEquals(3, contacts.size(), 'Three contacts should have been created.');
        for (Contact contact : contacts) {
            if (contact.Email == 'user1@example.com') {
                System.assertEquals(domainAccount.Id, contact.AccountId, 'Contacts with matching domains should be linked to the correct account.');
            }
        }
        List<CaseContactRole> caseContactRoles = [SELECT CasesId, ContactId, Role FROM CaseContactRole WHERE CasesId = :testCase.Id];
        System.assertEquals(3, caseContactRoles.size(), 'Three CaseContactRoles should have been created.');

        for (CaseContactRole role : caseContactRoles) {
            Contact contact = [SELECT Email FROM Contact WHERE Id = :role.ContactId LIMIT 1];
            if (contact.Email == 'user2@retool.com') {
                System.assertEquals('Retool', role.Role, 'Retool email addresses should have the Retool role.');
            } else {
                System.assertEquals('Collaborator', role.Role, 'Non-Retool email addresses should have the Collaborator role.');
            }
        }
    }
    @IsTest
    static void testUpdateCaseContactsWithNoEmails() {
        Account supportAccount = new Account(Name = 'Support Integration');
        insert supportAccount;
        Account domainAccount = new Account(Name = 'Domain Account');
        insert domainAccount;

        Domain_Map__c domainMap = new Domain_Map__c(Name = 'TestExample', Key__c = 'example.com', Matched_Account__c = domainAccount.Id, Domain_Validation__c = 'Confirmed', Domain_Validation_Last_Updated__c = Date.today());
        insert domainMap;

        Domain_Map__c domainMap2 = new Domain_Map__c(Name = 'TestExampleRetool', Key__c = 'retool.com', Matched_Account__c = supportAccount.Id, Domain_Validation__c = 'Confirmed', Domain_Validation_Last_Updated__c = Date.today());
        insert domainMap2;
        Case testCase = new Case(Subject = 'Test Case');
        insert testCase;        CaseContactUpdater.Request req = new CaseContactUpdater.Request();
        req.toEmails = '';
        req.ccEmails = null;
        req.caseId = testCase.Id;
        Test.startTest();
        CaseContactUpdater.updateCaseContacts(new List<CaseContactUpdater.Request>{req});
        Test.stopTest();
        List<Contact> contacts = [SELECT Id, Email, AccountId FROM Contact];
        System.assertEquals(0, contacts.size(), 'Three contacts should have been created.');
        List<CaseContactRole> caseContactRoles = [SELECT CasesId, ContactId, Role FROM CaseContactRole WHERE CasesId = :testCase.Id];
        System.assertEquals(0, caseContactRoles.size(), 'Three CaseContactRoles should have been created.');
    }
}