package com.flightmanager.airplanes.service;

import com.flightmanager.airplanes.exception.MyException;
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

    public Airplane addNewPlane(Airplane airplane) throws MyException {
        if (!this.airplaneRepository.existsByAirplanePlateNo(airplane.getAirplanePlateNo())) {
            return this.airplaneRepository.save(airplane);
        }else{
            throw new MyException("An airplane with the same identification plate already exists.");
        }
    }

    public Airplane updatePlane(Airplane airplane) throws MyException {
        if (this.airplaneRepository.existsById(airplane.getId())) {
            return this.airplaneRepository.save(airplane);
        }else{
            throw new MyException("The airplane was not found.");
        }
    }

    public void deletePlane(Airplane airplane) {
        this.airplaneRepository.delete(airplane);
    }

    public void flyPlane(Airplane airplane) {
        this.airplaneRepository.save(airplane);
    }
}
