package com.flightmanager.airplanes.controller;

import com.flightmanager.airplanes.model.Airplane;
import com.flightmanager.airplanes.service.AirplaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/airplane/")
public class AirplaneController {
    @Autowired
    private AirplaneService airplaneService;

    @GetMapping
    public Iterable<Airplane> getAll(){
        return this.airplaneService.getAllPlanes();
    }

    @PostMapping
    public Airplane addPlane(@RequestBody Airplane airplane){
        return this.airplaneService.addNewPlane(airplane);
    }

    @PutMapping
    public Airplane editPlane(@RequestBody Airplane airplane){
        return this.airplaneService.updatePlane(airplane);
    }

    @DeleteMapping
    public void removePlane(@RequestBody Airplane airplane){
        this.airplaneService.deletePlane(airplane);
    }
}
