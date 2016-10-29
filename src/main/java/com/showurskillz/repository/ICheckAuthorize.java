package com.showurskillz.repository;

import com.showurskillz.model.*;
import org.springframework.stereotype.Repository;

/**
 * Created by nitin on 10/28/2016.
 */


public interface ICheckAuthorize {

    UserAuthorize loginCheck(User user);

}

