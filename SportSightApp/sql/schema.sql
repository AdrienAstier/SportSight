-- ============================================
-- Désactivation des contraintes de clés étrangères
-- ============================================
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- Script de suppression des tables
-- ============================================
DROP TABLE IF EXISTS fact_match_summary;
DROP TABLE IF EXISTS fact_event;
DROP TABLE IF EXISTS dim_match;
DROP TABLE IF EXISTS dim_player;
DROP TABLE IF EXISTS dim_team;
DROP TABLE IF EXISTS dim_stadium;
DROP TABLE IF EXISTS dim_country;
DROP TABLE IF EXISTS dim_continent;
DROP TABLE IF EXISTS dim_season;
DROP TABLE IF EXISTS dim_position;
DROP TABLE IF EXISTS dim_event_type;
DROP TABLE IF EXISTS dim_competition;

-- ============================================
-- Réactivation des contraintes de clés étrangères
-- ============================================
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- Création des tables
-- ============================================

CREATE TABLE IF NOT EXISTS dim_continent (
    continent_id INT AUTO_INCREMENT PRIMARY KEY,
    continent_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS dim_country (
    country_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_continent_id INT,
    country_name VARCHAR(100),
    FOREIGN KEY (fk_continent_id) REFERENCES dim_continent(continent_id)
);

CREATE TABLE IF NOT EXISTS dim_stadium (
    stadium_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_country_id INT,
    stadium_name VARCHAR(100),
    stadium_capacity INT,
    FOREIGN KEY (fk_country_id) REFERENCES dim_country(country_id)
);

CREATE TABLE IF NOT EXISTS dim_competition (
    competition_id INT AUTO_INCREMENT PRIMARY KEY,
    competition_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS dim_team (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_country_id INT,
    team_name VARCHAR(100),
    FOREIGN KEY (fk_country_id) REFERENCES dim_country(country_id)
);

CREATE TABLE IF NOT EXISTS dim_season (
    season_id INT AUTO_INCREMENT PRIMARY KEY,
    season_name VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS dim_position (
    position_id INT AUTO_INCREMENT PRIMARY KEY,
    position_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS dim_player (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_team_id INT,
    fk_nationality_country_id INT,
    fk_position_id INT,
    player_first_name VARCHAR(50),
    player_last_name VARCHAR(50),
    player_birthdate DATE,
    player_height_cm INT,
    player_weight_kg INT,
    player_preferred_foot CHAR(1),
    FOREIGN KEY (fk_team_id) REFERENCES dim_team(team_id),
    FOREIGN KEY (fk_nationality_country_id) REFERENCES dim_country(country_id),
    FOREIGN KEY (fk_position_id) REFERENCES dim_position(position_id)
);

CREATE TABLE IF NOT EXISTS dim_match (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_home_team_id INT,
    fk_away_team_id INT,
    fk_stadium_id INT,
    fk_season_id INT,
    fk_competition_id INT,
    match_date DATE,
    FOREIGN KEY (fk_home_team_id) REFERENCES dim_team(team_id),
    FOREIGN KEY (fk_away_team_id) REFERENCES dim_team(team_id),
    FOREIGN KEY (fk_stadium_id) REFERENCES dim_stadium(stadium_id),
    FOREIGN KEY (fk_season_id) REFERENCES dim_season(season_id),
    FOREIGN KEY (fk_competition_id) REFERENCES dim_competition(competition_id)
);

CREATE TABLE IF NOT EXISTS dim_event_type (
    event_type_id INT AUTO_INCREMENT PRIMARY KEY,
    event_type_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS fact_event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_match_id INT,
    fk_player_id INT, 
    fk_team_id INT,
    fk_event_type_id INT,
    event_minute VARCHAR(5),
    FOREIGN KEY (fk_match_id) REFERENCES dim_match(match_id),
    FOREIGN KEY (fk_player_id) REFERENCES dim_player(player_id),
    FOREIGN KEY (fk_team_id) REFERENCES dim_team(team_id),
    FOREIGN KEY (fk_event_type_id) REFERENCES dim_event_type(event_type_id)
);

CREATE TABLE IF NOT EXISTS fact_match_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    fk_match_id INT,
    fk_team_id INT,
    summary_possession_pct INT,
    summary_shots INT,
    summary_shots_on_target INT,
    summary_passes INT,
    summary_pass_accuracy INT,
    summary_fouls INT,
    summary_corners INT,
    summary_goals INT,
    FOREIGN KEY (fk_match_id) REFERENCES dim_match(match_id),
    FOREIGN KEY (fk_team_id) REFERENCES dim_team(team_id)
);