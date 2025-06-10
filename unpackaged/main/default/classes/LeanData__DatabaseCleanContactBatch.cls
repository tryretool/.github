/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global virtual class DatabaseCleanContactBatch implements Database.AllowsCallouts, Database.Batchable<SObject>, Database.Stateful {
    global String condition;
    global LeanData.FuzzyMatch.Context context;
    global void execute(Database.BatchableContext ctx, List<SObject> scope) {

    }
    global virtual void finish(Database.BatchableContext ctx) {

    }
    global virtual Database.QueryLocator start(Database.BatchableContext ctx) {
        return null;
    }
}
