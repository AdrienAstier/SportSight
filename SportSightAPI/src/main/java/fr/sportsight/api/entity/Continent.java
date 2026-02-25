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
@Table(name = "dim_continent")
@Getter
@Setter
public class Continent extends RepresentationModel<Continent> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "continent_id")
    private int id;

    @Column(name = "continent_name")
    private String name;
}