package com.flightmanager.airplanes.exception;

public class MyException extends Exception{
    String myCustomMessage;

    public MyException(String messageOnError) {
        super(messageOnError);
        myCustomMessage = messageOnError;
    }

    public String toString(){
        return (myCustomMessage) ;
    }
}
