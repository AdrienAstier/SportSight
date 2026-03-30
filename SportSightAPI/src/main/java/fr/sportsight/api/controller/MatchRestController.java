package fr.sportsight.api.controller;

import fr.sportsight.api.entity.Match;
import fr.sportsight.api.service.MatchService;
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
class MatchRestController {

    private MatchService matchService;

    public MatchRestController(MatchService matchService) {

        this.matchService = matchService;
    }

    @GetMapping("/matches")
    public List<Match> getMatches() {

        List<Match> matches = matchService.getAllMatches();

        for (Match match : matches) {
            match.removeLinks();
            match.add(linkTo(methodOn(MatchRestController.class)
                    .getMatchById(match.getId())).withSelfRel());
        }
        return matches;
    }

    @GetMapping("/match/{id}")
    public Match getMatchById(@PathVariable int id) {

        Match match = matchService.getMatchById(id);

        match.removeLinks();

        match.add(linkTo(methodOn(MatchRestController.class)
                .getMatchById(id)).withSelfRel());
        match.add(linkTo(methodOn(MatchRestController.class)
                .getMatches()).withRel("all"));

        return match;
    }
}