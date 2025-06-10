trigger ValidateBusinessUnitCountryFields on Business_Unit__c (before insert, before update) { 
    pw_ccpro.CountryValidator2.Validate(Trigger.new, Trigger.oldMap); 
}