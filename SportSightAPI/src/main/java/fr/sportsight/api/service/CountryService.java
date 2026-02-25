package fr.sportsight.api.service;

import fr.sportsight.api.entity.Country;
import fr.sportsight.api.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {

        this.countryRepository = countryRepository;
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Country getCountryById(int id) {
        return countryRepository.findById(id).orElse(null);
    }
}