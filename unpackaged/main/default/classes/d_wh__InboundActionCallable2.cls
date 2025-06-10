/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global abstract class InboundActionCallable2 implements System.Callable {
    global InboundActionCallable2() {

    }
    global abstract d_wh.InboundActionCallable2.CallResponse Run(Map<String,String> param0, Map<String,String> param1, String param2);
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
