package com.showurskillz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(scanBasePackages={"com.showurskillz.controllers","com.showurskillz.services","com.showurskillz.repository","com.showurskillz.model"})
@ComponentScan
public class SsdIdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsdIdemoApplication.class, args);
	}
}
