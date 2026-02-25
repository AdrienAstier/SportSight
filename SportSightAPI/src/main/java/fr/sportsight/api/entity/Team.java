package fr.sportsight.api.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@JsonPropertyOrder({
        "id",
        "country",
        "name"
})
@Entity
@Table(name = "dim_team")
@Getter
@Setter
public class Team extends RepresentationModel<Team> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "fk_country_id")
    private Country country;

    @Column(name = "team_name")
    private String name;
}