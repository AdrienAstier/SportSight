package fr.sportsight.api.controller;

import fr.sportsight.api.entity.Country;
import fr.sportsight.api.service.CountryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api")
@PreAuthorize("isAuthenticated()")
@SecurityRequirement(name = "bearerAuth")
class CountryRestController {

    private CountryService countryService;

    public CountryRestController(CountryService countryService) {

        this.countryService = countryService;
    }

    @GetMapping("/countries")
    public List<Country> getCountries() {

        List<Country> countries = countryService.getAllCountries();

        for (Country country : countries) {
            country.removeLinks();
            country.add(linkTo(methodOn(CountryRestController.class)
                    .getCountryById(country.getId())).withSelfRel());
        }
        return countries;
    }

    @GetMapping("/country/{id}")
    public Country getCountryById(@PathVariable int id) {

        Country country = countryService.getCountryById(id);

        country.removeLinks();

        country.add(linkTo(methodOn(CountryRestController.class)
                .getCountryById(id)).withSelfRel());
        country.add(linkTo(methodOn(CountryRestController.class)
                .getCountries()).withRel("all"));

        return country;
    }
}