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
@Table(name = "dim_position")
@Getter
@Setter
public class Position extends RepresentationModel<Position> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "position_id")
    private int id;

    @Column(name = "position_name")
    private String name;
}