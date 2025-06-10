public without sharing class AutoConvertsLeads {
    /*
     *This method is invoked by the flow(Auto Converts Leads) when the Lead is Created or updated. 
     *This Method takes Three arguments(leadid,Accountid,Contactid) 
     *this method convert lead into Account and Contact
     */
    @InvocableMethod
    public static List<ConvertLeadActionResult> convertLeads(List<ConvertLeadActionRequest> requests) {
        LeadStatus convertStatus = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1];
        List<ConvertLeadActionResult> results = new List<ConvertLeadActionResult>();
        for (ConvertLeadActionRequest request : requests) {
            results.add(convertLead(request,convertStatus.MasterLabel));
        }
        return results;
    }
    public static ConvertLeadActionResult convertLead(ConvertLeadActionRequest request, String status) {
        Database.LeadConvert lc = new Database.LeadConvert();
        lc.setLeadId(request.leadId);
        lc.setConvertedStatus(status);
        lc.setDoNotCreateOpportunity(true);
        if (request.accountId != null) {
            lc.setAccountId(request.accountId);
        }
        
        if (request.contactId != null) {
            lc.setContactId(request.contactId);
        }

    
        Database.LeadConvertResult lcr = Database.convertLead(lc, true);
        if (lcr.isSuccess()) {
            ConvertLeadActionResult result = new ConvertLeadActionResult();
            result.accountId = lcr.getAccountId();
            result.contactId = lcr.getContactId();
            return result;
        } else {
            throw new ConvertLeadActionException(lcr.getErrors()[0].getMessage());
        }
    }
    
    
        public class ConvertLeadActionRequest {
            @InvocableVariable(required=true)
            public ID leadid;
            
            @InvocableVariable
            public ID accountId;
            
            @InvocableVariable
            public ID contactId;
        }
    public class ConvertLeadActionResult {
        @InvocableVariable
        public ID accountId;
        
        @InvocableVariable
        public ID contactId;
        
    }
    class ConvertLeadActionException extends Exception {}
}