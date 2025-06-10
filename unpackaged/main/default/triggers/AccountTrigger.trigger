trigger AccountTrigger on Account (before insert, before update, after insert, after update, before delete) {
	AccountTriggerHelper.newAccount = Trigger.new;
    AccountTriggerHelper.oldAccount = Trigger.old;
    AccountTriggerHelper.newMapAccount = Trigger.newMap;
    AccountTriggerHelper.oldMapAccount = Trigger.oldMap;
    
    if( !AccountTriggerHelper.runTrigger ){
        return;
    }
    
    if( Trigger.isBefore ){
        if( Trigger.isInsert || Trigger.isUpdate){
            AccountTriggerHelper.ownerIdInsert();          
        }
    }
    if( Trigger.isBefore ){
        if( Trigger.isDelete){
            AccountTriggerHelper.ownerIdDelete();          
        }
    }
    if( Trigger.isAfter ){
        if( Trigger.isUpdate){
            AccountTriggerHelper.ownerIdUpdate();          
        }
    }
}