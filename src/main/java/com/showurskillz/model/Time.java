package com.showurskillz.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by nitin on 11/11/2016.
 */

@JsonSerialize
@Component
public class Time {


    private String Day;
    private Date toTime;
    private Date fromTime;
    SimpleDateFormat formatDate = new SimpleDateFormat("HH:mm a");

    /*Date dNow = new Date( );
      SimpleDateFormat ft =
      new SimpleDateFormat ("E yyyy.MM.dd 'at' hh:mm:ss a zzz");

      System.out.println("Current Date: " + ft.format(dNow));*/




}


