public with sharing class ActionController {
    @AuraEnabled(cacheable=true)
    public static List<Actions__c> getActions(String sObjectType) {
        // Query actions related to the passed SObject type
        return [SELECT Action__c,Icon__c, URL__c, Sobject_Name__c FROM Actions__c WHERE Sobject_Name__c = :sObjectType];
    }
}