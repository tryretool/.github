/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class ContinuousCleanScheduler implements Database.Batchable<SObject>, Database.Stateful, System.Schedulable {
    global String batchType;
    global LeanData.FuzzyMatch.Context context;
    global void execute(System.SchedulableContext sc) {

    }
    global void execute(Database.BatchableContext ctx, List<SObject> sobjectScope) {

    }
    global void finish(Database.BatchableContext ctx) {

    }
    global Database.QueryLocator start(Database.BatchableContext ctx) {
        return null;
    }
}
