package fr.sportsight.api.controller;

import fr.sportsight.api.entity.Player;
import fr.sportsight.api.service.PlayerService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api")
@PreAuthorize("isAuthenticated()")
@SecurityRequirement(name = "bearerAuth")
class PlayerRestController {

    private PlayerService playerService;

    public PlayerRestController(PlayerService playerService) {

        this.playerService = playerService;
    }

    @GetMapping("/players")
    public List<Player> getPlayers() {

        List<Player> players = playerService.getAllPlayers();

        for (Player player : players) {
            player.removeLinks();
            player.add(linkTo(methodOn(PlayerRestController.class)
                    .getPlayerById(player.getId())).withSelfRel());
        }
        return players;
    }

    @GetMapping("/player/{id}")
    public Player getPlayerById(@PathVariable int id) {

        Player player = playerService.getPlayerById(id);

        player.removeLinks();

        player.add(linkTo(methodOn(PlayerRestController.class)
                .getPlayerById(id)).withSelfRel());
        player.add(linkTo(methodOn(PlayerRestController.class)
                .getPlayers()).withRel("all"));

        return player;
    }
}