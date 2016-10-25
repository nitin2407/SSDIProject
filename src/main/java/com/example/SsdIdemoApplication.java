package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages={"com.example.controllers"})
public class SsdIdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsdIdemoApplication.class, args);
	}
}
