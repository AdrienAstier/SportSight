package fr.sportsight.api.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.Date;

@JsonPropertyOrder({
        "id",
        "team",
        "country",
        "position",
        "firstName",
        "lastName",
        "birthdate",
        "height",
        "weight",
        "preferredFoot"
})
@Entity
@Table(name = "dim_player")
@Getter
@Setter
public class Player extends RepresentationModel<Player> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "fk_team_id")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "fk_nationality_country_id")
    private Country country;

    @ManyToOne
    @JoinColumn(name = "fk_position_id")
    private Position position;

    @Column(name = "player_first_name")
    private String firstName;

    @Column(name = "player_last_name")
    private String lastName;

    @Column(name = "player_birthdate")
    private Date birthdate;

    @Column(name = "player_height_cm")
    private int height;

    @Column(name = "player_weight_kg")
    private int weight;

    @Column(name = "player_preferred_foot")
    private String preferredFoot;
}