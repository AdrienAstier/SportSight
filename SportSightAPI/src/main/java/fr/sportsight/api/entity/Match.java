package fr.sportsight.api.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.Date;

@JsonPropertyOrder({
        "id",
        "homeTeam",
        "awayTeam",
        "stadium",
        "season",
        "competition",
        "date"
})
@Entity
@Table(name = "dim_match")
@Getter
@Setter
public class Match extends RepresentationModel<Match> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "match_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "fk_home_team_id")
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "fk_away_team_id")
    private Team awayTeam;

    @ManyToOne
    @JoinColumn(name = "fk_stadium_id")
    private Stadium stadium;

    @ManyToOne
    @JoinColumn(name = "fk_season_id")
    private Season season;

    @ManyToOne
    @JoinColumn(name = "fk_competition_id")
    private Competition competition;

    @Column(name = "match_date")
    private Date date;
}