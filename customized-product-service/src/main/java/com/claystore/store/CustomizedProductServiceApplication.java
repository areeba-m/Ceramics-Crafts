package com.claystore.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication(scanBasePackages = {
        "com.claystore",
        "com.claystore.commonsecurity"
})
public class CustomizedProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomizedProductServiceApplication.class, args);
    }

}
