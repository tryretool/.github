/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class FileUploadFlow {
    global FileUploadFlow() {

    }
    @InvocableMethod(label='Centro: Send file to conversation')
    global static List<Centro.FileUploadFlow.UploadFileResult> UploadFile(List<Centro.FileUploadFlow.UploadFileSetting> settings) {
        return null;
    }
global class UploadFileResult {
    global UploadFileResult() {

    }
}
global class UploadFileSetting {
    @InvocableVariable(label='Channel Id' required=true)
    global String channelId;
    @InvocableVariable(label='Content Version Id (limit 4MB)' required=true)
    global Id contentVersionId;
    global UploadFileSetting() {

    }
}
}
