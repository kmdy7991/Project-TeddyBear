package com.teddybear.wordservice.util;

import org.hibernate.Hibernate;

public class EntityUtils {
    public static <T> T initializeAndUnproxy(T entity) {
        if (entity == null) {
            throw new IllegalArgumentException("Entity cannot be null");
        }

        Hibernate.initialize(entity);
        return (T) Hibernate.unproxy(entity);
    }

}
