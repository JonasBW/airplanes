package com.flightmanager.airplanes.repository;

import com.flightmanager.airplanes.model.Airplane;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface AirplaneRepository extends CrudRepository<Airplane, Integer> {
}
