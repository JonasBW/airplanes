package com.flightmanager.airplanes.controller;

import com.flightmanager.airplanes.exception.MyException;
import com.flightmanager.airplanes.model.Airplane;
import com.flightmanager.airplanes.service.AirplaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public ResponseEntity<Airplane> addPlane(@RequestBody Airplane airplane){
        try{
            this.airplaneService.addNewPlane(airplane);
        }catch (MyException e){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, String.valueOf(e), e);
        }
        return ResponseEntity.ok(airplane);
    }

    @PutMapping
    public ResponseEntity<Airplane> editPlane(@RequestBody Airplane airplane){
        try{
            this.airplaneService.updatePlane(airplane);
        }catch (MyException e){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, String.valueOf(e), e);
        }
        return ResponseEntity.ok(airplane);
    }

    @DeleteMapping
    public void removePlane(@RequestBody Airplane airplane){
        this.airplaneService.deletePlane(airplane);
    }

    @PutMapping("fly/")
    public void flyPlane(@RequestBody Airplane airplane){
        this.airplaneService.flyPlane(airplane);
    }
}
