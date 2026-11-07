package com.aziz.users.restControllers;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import static org.junit.jupiter.api.Assertions.*;
class RegistrationMaintenanceTest {
  @Test void registrationIsRejectedBeforeServiceOrDatabaseAccess() {
    var response = new UserRestController().register(null);
    assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
    assertNotNull(response.getBody());
  }
}
