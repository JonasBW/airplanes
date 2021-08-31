package com.flightmanager.airplanes.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Airplane {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String airplaneType;
    String airplanePlateNo;
    String currentAirfield;
    int fuel;

    public Airplane() {
    }

    public Airplane(int id, String airplaneType, String airplanePlateNo, String currentAirfield, int fuel) {
        this.id = id;
        this.airplaneType = airplaneType;
        this.airplanePlateNo = airplanePlateNo;
        this.currentAirfield = currentAirfield;
        this.fuel = fuel;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAirplaneType() {
        return airplaneType;
    }

    public void setAirplaneType(String airplaneType) {
        this.airplaneType = airplaneType;
    }

    public String getAirPlanePlateNo() {
        return airplanePlateNo;
    }

    public void setAirPlanePlateNo(String airplanePlateNo) {
        this.airplanePlateNo = airplanePlateNo;
    }

    public String getCurrentAirfield() {
        return currentAirfield;
    }

    public void setCurrentAirfield(String currentAirfield) {
        this.currentAirfield = currentAirfield;
    }

    public int getFuel() {
        return fuel;
    }

    public void setFuel(int fuel) {
        this.fuel = fuel;
    }
}

