package fr.sportsight.api.entity;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@JsonPropertyOrder({
        "id",
        "match",
        "team",
        "possessionPct",
        "shots",
        "shotsOnTarget",
        "passes",
        "passAccuracy",
        "fouls",
        "corners",
        "goals"
})
@Entity
@Table(name = "fact_match_summary")
@Getter
@Setter
public class FactMatchSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "summary_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_match_id")
    private Match match;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_team_id")
    private Team team;

    @Column(name = "summary_possession_pct")
    private int possessionPct;

    @Column(name = "summary_shots")
    private int shots;

    @Column(name = "summary_shots_on_target")
    private int shotsOnTarget;

    @Column(name = "summary_passes")
    private int passes;

    @Column(name = "summary_pass_accuracy")
    private int passAccuracy;

    @Column(name = "summary_fouls")
    private int fouls;

    @Column(name = "summary_corners")
    private int corners;

    @Column(name = "summary_goals")
    private int goals;
}