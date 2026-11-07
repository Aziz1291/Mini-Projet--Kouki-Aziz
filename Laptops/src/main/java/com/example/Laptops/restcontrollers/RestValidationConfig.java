package com.example.Laptops.restcontrollers;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.validation.Validator;

/**
 * Validates entities sent to the Spring Data REST endpoints (such as /models)
 * before they are saved, so invalid input gets a 400 response.
 */
@Configuration
public class RestValidationConfig implements RepositoryRestConfigurer {

    private final Validator validator;

    public RestValidationConfig(@Qualifier("defaultValidator") Validator validator) {
        this.validator = validator;
    }

    @Override
    public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener listener) {
        listener.addValidator("beforeCreate", validator);
        listener.addValidator("beforeSave", validator);
    }
}
