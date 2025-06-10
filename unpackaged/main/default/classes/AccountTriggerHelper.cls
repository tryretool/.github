public without sharing class AccountTriggerHelper {
    public static List<Account> newAccount = new List<Account>();
    public static List<Account> oldAccount = new List<Account>();
    public static Map<Id, Account> newMapAccount = new Map<Id, Account>();
    public static Map<Id, Account> oldMapAccount = new Map<Id, Account>();
    
    public static boolean runTrigger = True;
    
    public static void ownerIdInsert(){
        
        List<Id> parents=new List<Id>();
        for(Account a: newAccount){              
            parents.add(a.ParentId);
        }
        
        Map<Id,Account> parMaps = new Map<Id,Account>([Select Id, ParentId, Ultimate_Parent_Account__c 
                                                       From Account 
                                                       where Id in:parents
                                                      ]);
        
        for(Account a:newAccount){
            a.Ultimate_Parent_Account__c=a.ParentId==null
                ?null
                :parMaps.get(a.ParentId).Ultimate_Parent_Account__c==null
                    ?parMaps.get(a.ParentId).Id
                    :parMaps.get(a.ParentId).Ultimate_Parent_Account__c;
        }   
    }
    public static void ownerIdDelete(){
        List<Account> acc=[Select Id, ParentId from Account Where ParentId in :oldMapAccount.keySet()];
        for(Account a:acc){
            a.ParentId=null;
        }
        update acc;
    }
    public static void ownerIdUpdate(){
        List<Account> childAccs=[Select Id,ParentId,Ultimate_Parent_Account__C from Account Where ParentId in:oldMapAccount.keySet()];
        Map<Id,Account> parMap= oldMapAccount;
        for(Account a:childAccs){
            a.Ultimate_Parent_Account__c=a.ParentId==null
                ?null
                :parMap.get(a.ParentId).Ultimate_Parent_Account__c==null
                    ?parMap.get(a.ParentId).Id
                    :parMap.get(a.ParentId).Ultimate_Parent_Account__c;
        }
        update childAccs;
    }
}