public without sharing class CaseContactUpdater {
    private static final List<String> emailsToSkip = getEmailsToSkip();
    private static final String SupportIntegrationAccount = Label.SupportIntegrationAccount; //001Qo00000SVKDfIAP
    @InvocableMethod
    public static void updateCaseContacts(List<Request> requests) {
        List<CaseContactRole> caseContactRolesToInsert = new List<CaseContactRole>();
        Map<Id, Set<String>> caseIdToEmailMap = new Map<ID, Set<String>>();
        for (Request req : requests) {
            Set<String> emailSet = new Set<String>();
            emailSet.addAll(parseEmails(req.toEmails));
            emailSet.addAll(parseEmails(req.ccEmails));
            emailSet.addAll(parseEmails(req.fromEmail));
            for(String emailToRemove : emailsToSkip){
                emailSet.remove(emailToRemove); 
            }        
            Set<String> WSRemoved = new Set<String>();
            for(String email : emailSet){
                WSRemoved.add(email.trim());
            }
            emailSet = WSRemoved;
            caseIdToEmailMap.put(req.CaseId, emailSet);
        }
        Set<String> allEmailSet = getAllEmailSet(caseIdToEmailMap);
        Map<String, Contact> existingContacts = new Map<String, Contact>();
        if (!allEmailSet.isEmpty()) {
            List<Contact> contacts = [
                SELECT Id, Email, AccountId, LastActivityDate, CreatedDate
                FROM Contact
                WHERE Email IN :allEmailSet
                ORDER BY Email ASC, LastActivityDate DESC NULLS LAST, CreatedDate ASC
            ];
            for (Contact con : contacts) {
                if (!existingContacts.containsKey(con.Email)) {
                    existingContacts.put(con.Email, con);
                }
            }
        }
        Map<String, Id> domainAccountMap = generateDomainAccountMap(allEmailSet);
        Map<Id, List<Contact>> caseContactListMap = new Map<Id, List<Contact>>();        
        List<Contact> contactsToInsert = new List<Contact>();
        for(Id caseId : caseIdToEmailMap.keySet()){
            List<Contact> tempList = new List<Contact>();
            Set<String> emailSet = caseIdToEmailMap.get(caseId);
            for (String email : emailSet) {
                if (String.isEmpty(email)) continue;
                if (!existingContacts.containsKey(email)) {
                    Contact con = new Contact(
                        Email = email,
                        LastName = '[Not Provided]',
                        Needs_Enrichment__c = true,
                        LeadSource = 'Support Portal'
                    );
                    String domain = extractDomain(email);
                    Id matchedAccountId = domainAccountMap.get(domain);
                    if (matchedAccountId != null) {
                        con.AccountId = matchedAccountId;
                    } else {
                        con.AccountId = SupportIntegrationAccount;
                    }
                    contactsToInsert.add(con);
                }
            }
        }
        if(!contactsToInsert.isEmpty()){
            insert contactsToInsert;
        }
        for(Contact con : contactsToInsert){
            existingContacts.put(con.Email, con);
        }
        for(Id caseId : caseIdToEmailMap.keySet()){
            List<Contact> tempList = new List<Contact>();
            Set<String> emailSet = caseIdToEmailMap.get(caseId);
            for (String email : emailSet) {
                if (String.isEmpty(email)) continue;
                Contact contact = existingContacts.get(email);
                tempList.add(contact);
            }
            caseContactListMap.put(caseId, tempList);
        }
		Map<Id, List<ID>> caseToContactRoleMap = getCaseToContactRoleMap(caseContactListMap.keySet());
        for(Id caseId : caseContactListMap.keySet()){
            List<Contact> allContactsOnCase = caseContactListMap.get(caseId);
            List<ID> contactRolesOnCase = caseToContactRoleMap.get(caseId);
            for(Contact con : allContactsOnCase){
                if(contactRolesOnCase != null && contactRolesOnCase.contains(con.Id))
                    continue;
                String role = con.Email.endsWith('@retool.com') ? 'Retool' : 'Collaborator';
                caseContactRolesToInsert.add(new CaseContactRole(
                        CasesId = caseId,
                        ContactId = con.Id,
                        Role = role
                    ));
            }
        }
        if(!caseContactRolesToInsert.isEmpty()){
            insert caseContactRolesToInsert;
        }
    }
    
    private static Map<String, Id> generateDomainAccountMap(Set<String> allEmailSet){
        List<String> domainList = new List<String>();
        for(String email : allEmailSet){
            domainList.add(extractDomain(email));
        }
        return findMatchingAccount(domainList);
    }
    
    private static Set<String> getAllEmailSet(Map<Id, Set<String>> caseIdToEmailMap){
        Set<String> allEmails = new Set<String>();
        for(Set<String> emails : caseIdToEmailMap.values()){
            allEmails.addAll(emails);
        }
        return allEmails;
    }
    
    private static List<String> parseEmails(String emails) {
        if (String.isBlank(emails)) return new List<String>();
        emails = emails.replace(';', ',');
        return emails.split(',');
    }
    
    private static List<String> getEmailsToSkip(){
        String emailString = Label.EmailsToSkip;
        List<String> emails = parseEmails(emailString);
        List<String> WSRemoved = new List<String>();
        for(String email : emails){
            WSRemoved.add(email.trim());
        }
        return emails;
    }
    
    private static String extractDomain(String email) {
        if (String.isBlank(email) || !email.contains('@')) return null;
        return email.substringAfter('@').toLowerCase();
    }
    
    private static Map<String, Id> findMatchingAccount(List<String> domains) {
        Map<String, Id> domainAccountMap = new Map<String, Id>();
        for(Domain_Map__c domainMap : [
            SELECT Id, Key__c, Matched_Account__c
            FROM Domain_Map__c
            WHERE Key__c IN : domains AND Matched_Account__c != null
        ]){
            domainAccountMap.put(domainMap.Key__c, domainMap.Matched_Account__c);
        }
        return domainAccountMap;
    }
    @TestVisible
    private static Map<Id, List<ID>> getCaseToContactRoleMap(Set<Id> caseIds) {
        Map<Id, List<ID>> caseToContactRoleMap = new Map<Id, List<ID>>();
        for(CaseContactRole ccr : [
            SELECT CasesId, ContactId
            FROM CaseContactRole
            WHERE CasesId = :caseIds
        ]){
            List<Id> tempContactIds = new List<Id>();
            if(caseToContactRoleMap.containsKey(ccr.CasesId)){
                tempContactIds = caseToContactRoleMap.get(ccr.CasesId);
            }
            tempContactIds.add(ccr.ContactId);
            caseToContactRoleMap.put(ccr.CasesId, tempContactIds);
        }
        return caseToContactRoleMap;
    }
    
    public class Request {
        @InvocableVariable
        public String toEmails;

        @InvocableVariable
        public String fromEmail;
        
        @InvocableVariable
        public String ccEmails;
        
        @InvocableVariable(required=true)
        public Id caseId;
    }
}