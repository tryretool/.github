/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
@RestResource(urlMapping='/AdvertisableREST/*')
global class AdvertisableREST {
    global AdvertisableREST() {

    }
    @HttpGet
    global static String advertisableGetMethod() {
        return null;
    }
    @HttpPost
    global static void advertisablePostMethod() {

    }
    @HttpDelete
    global static void deleteAdvertisables() {

    }
global class AdvertisableData {
    global String advertisableEID;
    global Datetime lastUpdatedDate;
    global AdvertisableData(String advEID, Datetime lastUpdated) {

    }
}
global class incomingAdvertisables {
    global String advertisable;
    global Datetime updatedDate;
    global incomingAdvertisables() {

    }
}
}
