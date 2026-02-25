package fr.sportsight.api.controller;

import fr.sportsight.api.entity.Team;
import fr.sportsight.api.service.TeamService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api")
class TeamRestController {

    private TeamService teamService;

    public TeamRestController(TeamService teamService) {

        this.teamService = teamService;
    }

    @GetMapping("/teams")
    public List<Team> getTeams() {

        List<Team> teams = teamService.getAllTeams();

        for (Team team : teams) {
            team.removeLinks();
            team.add(linkTo(methodOn(TeamRestController.class)
                    .getTeamById(team.getId())).withSelfRel());
        }
        return teams;
    }

    @GetMapping("/team/{id}")
    public Team getTeamById(@PathVariable int id) {

        Team team = teamService.getTeamById(id);

        team.removeLinks();

        team.add(linkTo(methodOn(TeamRestController.class)
                .getTeamById(id)).withSelfRel());
        team.add(linkTo(methodOn(TeamRestController.class)
                .getTeams()).withRel("all"));

        return team;
    }
}