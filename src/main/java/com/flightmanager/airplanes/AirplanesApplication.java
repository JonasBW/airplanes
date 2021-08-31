package com.flightmanager.airplanes;

import com.flightmanager.airplanes.model.Airplane;
import com.flightmanager.airplanes.service.AirplaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AirplanesApplication implements CommandLineRunner {
	@Autowired
	private AirplaneService airplaneService;

	public static void main(String[] args) {
		SpringApplication.run(AirplanesApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		airplaneService.addNewPlane(new Airplane(0,"Air bus","A301","Berlijn",5));
		airplaneService.addNewPlane(new Airplane(0,"Air bus","A302","London,",5));
		airplaneService.addNewPlane(new Airplane(0,"Air bus","A303","Stockholm,",5));
		airplaneService.addNewPlane(new Airplane(0,"Air bus","A304","Parijs,",5));
		airplaneService.addNewPlane(new Airplane(0,"Air bus","A305","Amsterdam",5));
	}
}
