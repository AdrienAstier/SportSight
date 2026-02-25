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
@Table(name = "dim_event_type")
@Getter
@Setter
public class EventType extends RepresentationModel<EventType> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_type_id")
    private int id;

    @Column(name = "event_type_name")
    private String name;
}