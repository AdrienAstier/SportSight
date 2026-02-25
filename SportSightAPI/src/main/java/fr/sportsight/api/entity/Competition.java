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
@Table(name = "dim_competition")
@Getter
@Setter
public class Competition extends RepresentationModel<Competition> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "competition_id")
    private int id;

    @Column(name = "competition_name")
    private String name;
}