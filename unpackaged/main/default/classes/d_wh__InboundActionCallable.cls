/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global abstract class InboundActionCallable implements System.Callable {
    global InboundActionCallable() {

    }
    global abstract d_wh.InboundActionCallable.CallResponse Run(Map<String,String> param0, Object param1);
global class CallResponse {
    global String responseBody {
        get;
        set;
    }
    global Integer responseCode {
        get;
        set;
    }
    global CallResponse() {

    }
}
}
