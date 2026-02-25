package fr.sportsight.api.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@JsonPropertyOrder({
        "id",
        "name"
})
@Entity
@Table(name = "dim_season")
@Getter
@Setter
public class Season extends RepresentationModel<Season> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "season_id")
    private int id;

    @Column(name = "season_name")
    private String name;
}