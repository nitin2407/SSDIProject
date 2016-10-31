package com.showurskillz.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.stereotype.Component;

/**
 * Created by nitin on 10/22/2016.
 */
@JsonSerialize
@Component
public class UserAuthorize {

    private boolean allow;

    public UserAuthorize()
    {
        // default controller
    }
    public UserAuthorize(boolean allow) {
        this.allow = allow;
    }


    public boolean getAllow() {
        return allow;
    }

    public void setAllow(boolean allow) {
        this.allow = allow;
    }



}
