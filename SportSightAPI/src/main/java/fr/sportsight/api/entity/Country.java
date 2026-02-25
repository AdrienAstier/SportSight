package fr.sportsight.api.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@JsonPropertyOrder({
        "id",
        "name",
        "continent"
})
@Entity
@Table(name = "dim_country")
@Getter
@Setter
public class Country extends RepresentationModel<Country> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "country_id")
    private int id;

    @Column(name = "country_name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "fk_continent_id")
    private Continent continent;
}