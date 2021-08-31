package com.flightmanager.airplanes.service;

import com.flightmanager.airplanes.model.Airplane;
import com.flightmanager.airplanes.repository.AirplaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirplaneService {
    @Autowired
    private AirplaneRepository airplaneRepository;

    public Iterable<Airplane> getAllPlanes() {
        return this.airplaneRepository.findAll();
    }

    public Airplane addNewPlane(Airplane airplane) {
        return this.airplaneRepository.save(airplane);
    }

    public Airplane updatePlane(Airplane airplane) {
        return this.airplaneRepository.save(airplane);
    }

    public void deletePlane(Airplane airplane) {
        this.airplaneRepository.delete(airplane);
    }
}
