package fr.sportsight.api.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@JsonPropertyOrder({
        "id",
        "country",
        "name",
        "capacity"
})
@Entity
@Table(name = "dim_stadium")
@Getter
@Setter
public class Stadium extends RepresentationModel<Stadium> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stadium_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "fk_country_id")
    private Country country;

    @Column(name = "stadium_name")
    private String name;

    @Column(name = "stadium_capacity")
    private String capacity;
}