-- ============================================
-- Script d'insertion de données de test
-- Compétition: Premier League 2024-2025
-- ============================================

-- ============================================
-- Insertion: dim_continent
-- ============================================
INSERT INTO dim_continent (continent_name) VALUES
('Africa'),
('Antarctica'),
('Asia'),
('Europe'),
('North America'),
('Oceania'),
('South America');

-- ============================================
-- Insertion: dim_country
-- ============================================
INSERT INTO dim_country (fk_continent_id, country_name) VALUES
-- Europe
(4, 'England'),
(4, 'Norway'),
(4, 'Belgium'),
(4, 'Spain'),
(4, 'Portugal'),
(4, 'France'),
(4, 'Germany'),
(4, 'Hungary'),
(4, 'Netherlands'),
(4, 'Scotland'),
(4, 'Denmark'),
-- South America
(7, 'Brazil'),
(7, 'Uruguay'),
(7, 'Colombia'),
(7, 'Argentina'),
(7, 'Ecuador'),
-- Africa
(1, 'Egypt'),
(1, 'Senegal'),
(1, 'Cameroon');

-- ============================================
-- Insertion: dim_stadium
-- ============================================
INSERT INTO dim_stadium (fk_country_id, stadium_name, stadium_capacity) VALUES
(1, 'Etihad Stadium', 53400),
(1, 'Anfield', 61276),
(1, 'Tottenham Hotspur Stadium', 62850),
(1, 'Old Trafford', 74310),
(1, 'Emirates Stadium', 60704),
(1, 'Stamford Bridge', 40341),
(1, 'Villa Park', 42785),
(1, 'St James Park', 52305);

-- ============================================
-- Insertion: dim_season
-- ============================================
INSERT INTO dim_season (season_name) VALUES
('2024-2025');

-- ============================================
-- Insertion: dim_position
-- ============================================
INSERT INTO dim_position (position_name) VALUES
('Forward'),
('Midfielder'),
('Defender'),
('Goalkeeper');

-- ============================================
-- Insertion: dim_competition
-- ============================================
INSERT INTO dim_competition (competition_name) VALUES
('Premier League'),
('FA Cup'),
('EFL Cup'),
('UEFA Champions League'),
('UEFA Europa League');

-- ============================================
-- Insertion: dim_team
-- ============================================
INSERT INTO dim_team (fk_country_id, team_name) VALUES
(1, 'Manchester City'),
(1, 'Arsenal'),
(1, 'Liverpool'),
(1, 'Aston Villa'),
(1, 'Tottenham Hotspur'),
(1, 'Chelsea'),
(1, 'Newcastle United'),
(1, 'Manchester United'),
(1, 'West Ham United'),
(1, 'Brighton'),
(1, 'Wolverhampton'),
(1, 'Fulham'),
(1, 'Bournemouth'),
(1, 'Crystal Palace'),
(1, 'Brentford'),
(1, 'Everton'),
(1, 'Nottingham Forest'),
(1, 'Luton Town'),
(1, 'Burnley'),
(1, 'Sheffield United');

-- ============================================
-- Insertion: dim_player (Manchester City)
-- ============================================
INSERT INTO dim_player (fk_team_id, fk_nationality_country_id, fk_position_id, player_first_name, player_last_name, player_birthdate, player_height_cm, player_weight_kg, player_preferred_foot) VALUES
(1, 2, 1, 'Erling', 'Haaland', '2000-07-21', 194, 88, 'L'),
(1, 3, 2, 'Kevin', 'De Bruyne', '1991-06-28', 181, 70, 'R'),
(1, 1, 2, 'Phil', 'Foden', '2000-05-28', 171, 69, 'L'),
(1, 4, 2, 'Rodri', 'Hernandez', '1996-06-22', 191, 82, 'R'),
(1, 1, 2, 'Jack', 'Grealish', '1995-09-10', 180, 76, 'R'),
(1, 5, 2, 'Bernardo', 'Silva', '1994-08-10', 173, 64, 'L'),
(1, 5, 3, 'Ruben', 'Dias', '1997-05-14', 187, 80, 'R'),
(1, 1, 3, 'John', 'Stones', '1994-05-28', 188, 70, 'R'),
(1, 1, 3, 'Kyle', 'Walker', '1990-05-28', 183, 83, 'R'),
(1, 12, 4, 'Ederson', 'Moraes', '1993-08-17', 188, 86, 'L');

-- ============================================
-- Insertion: dim_player (Arsenal)
-- ============================================
INSERT INTO dim_player (fk_team_id, fk_nationality_country_id, fk_position_id, player_first_name, player_last_name, player_birthdate, player_height_cm, player_weight_kg, player_preferred_foot) VALUES
(2, 1, 1, 'Bukayo', 'Saka', '2001-09-05', 178, 72, 'L'),
(2, 2, 2, 'Martin', 'Odegaard', '1998-12-17', 178, 68, 'L'),
(2, 12, 1, 'Gabriel', 'Jesus', '1997-04-03', 175, 73, 'R'),
(2, 1, 2, 'Declan', 'Rice', '1999-01-14', 188, 82, 'R'),
(2, 12, 1, 'Gabriel', 'Martinelli', '2001-06-18', 178, 75, 'R'),
(2, 6, 3, 'William', 'Saliba', '2001-03-24', 192, 83, 'R'),
(2, 12, 3, 'Gabriel', 'Magalhaes', '1997-12-19', 190, 84, 'L'),
(2, 1, 3, 'Ben', 'White', '1997-10-08', 186, 78, 'R'),
(2, 1, 4, 'Aaron', 'Ramsdale', '1998-05-14', 188, 81, 'R'),
(2, 7, 1, 'Kai', 'Havertz', '1999-06-11', 193, 87, 'L');

-- ============================================
-- Insertion: dim_player (Liverpool)
-- ============================================
INSERT INTO dim_player (fk_team_id, fk_nationality_country_id, fk_position_id, player_first_name, player_last_name, player_birthdate, player_height_cm, player_weight_kg, player_preferred_foot) VALUES
(3, 17, 1, 'Mohamed', 'Salah', '1992-06-15', 175, 71, 'L'),
(3, 13, 1, 'Darwin', 'Nunez', '1999-06-24', 187, 81, 'R'),
(3, 14, 1, 'Luis', 'Diaz', '1997-01-13', 178, 67, 'R'),
(3, 15, 2, 'Alexis', 'Mac Allister', '1998-12-24', 176, 73, 'R'),
(3, 8, 2, 'Dominik', 'Szoboszlai', '2000-10-25', 187, 74, 'R'),
(3, 9, 3, 'Virgil', 'van Dijk', '1991-07-08', 195, 92, 'R'),
(3, 1, 3, 'Trent', 'Alexander-Arnold', '1998-10-07', 180, 76, 'R'),
(3, 10, 3, 'Andy', 'Robertson', '1994-03-11', 178, 64, 'L'),
(3, 12, 4, 'Alisson', 'Becker', '1992-10-02', 193, 91, 'R'),
(3, 9, 1, 'Cody', 'Gakpo', '1999-05-07', 189, 79, 'R');

-- ============================================
-- Insertion: dim_player (Chelsea)
-- ============================================
INSERT INTO dim_player (fk_team_id, fk_nationality_country_id, fk_position_id, player_first_name, player_last_name, player_birthdate, player_height_cm, player_weight_kg, player_preferred_foot) VALUES
(6, 1, 2, 'Cole', 'Palmer', '2002-05-06', 189, 73, 'L'),
(6, 1, 1, 'Raheem', 'Sterling', '1994-12-08', 170, 69, 'R'),
(6, 18, 1, 'Nicolas', 'Jackson', '2001-06-20', 183, 78, 'R'),
(6, 15, 2, 'Enzo', 'Fernandez', '2001-01-17', 178, 78, 'R'),
(6, 16, 2, 'Moises', 'Caicedo', '2001-11-02', 178, 72, 'R'),
(6, 12, 3, 'Thiago', 'Silva', '1984-09-22', 183, 79, 'R'),
(6, 1, 3, 'Reece', 'James', '1999-12-08', 182, 85, 'R'),
(6, 1, 3, 'Ben', 'Chilwell', '1996-12-21', 180, 78, 'L'),
(6, 4, 4, 'Robert', 'Sanchez', '1997-11-18', 197, 88, 'L'),
(6, 6, 1, 'Christopher', 'Nkunku', '1997-11-14', 175, 74, 'R');

-- ============================================
-- Insertion: dim_player (Manchester United)
-- ============================================
INSERT INTO dim_player (fk_team_id, fk_nationality_country_id, fk_position_id, player_first_name, player_last_name, player_birthdate, player_height_cm, player_weight_kg, player_preferred_foot) VALUES
(8, 1, 1, 'Marcus', 'Rashford', '1997-10-31', 180, 70, 'R'),
(8, 5, 2, 'Bruno', 'Fernandes', '1994-09-08', 179, 69, 'R'),
(8, 11, 1, 'Rasmus', 'Hojlund', '2003-02-04', 191, 87, 'L'),
(8, 12, 2, 'Casemiro', 'Santos', '1992-02-23', 185, 84, 'R'),
(8, 15, 1, 'Alejandro', 'Garnacho', '2004-07-01', 180, 72, 'R'),
(8, 15, 3, 'Lisandro', 'Martinez', '1998-01-18', 175, 78, 'L'),
(8, 6, 3, 'Raphael', 'Varane', '1993-04-25', 191, 81, 'R'),
(8, 1, 3, 'Luke', 'Shaw', '1995-07-12', 185, 75, 'L'),
(8, 19, 4, 'Andre', 'Onana', '1996-04-02', 190, 82, 'R'),
(8, 1, 2, 'Mason', 'Mount', '1999-01-10', 181, 70, 'R');

-- ============================================
-- Insertion: dim_match
-- ============================================
INSERT INTO dim_match (fk_home_team_id, fk_away_team_id, fk_stadium_id, fk_season_id, fk_competition_id, match_date) VALUES
(1, 2, 1, 1, 1, '2024-08-17'),
(3, 6, 2, 1, 1, '2024-08-17'),
(5, 15, 3, 1, 1, '2024-08-18'),
(8, 10, 4, 1, 1, '2024-08-18'),
(2, 7, 5, 1, 1, '2024-08-24'),
(6, 9, 6, 1, 1, '2024-08-24'),
(1, 3, 1, 1, 1, '2024-08-25'),
(4, 5, 7, 1, 1, '2024-08-25'),
(2, 1, 5, 1, 1, '2024-08-31'),
(3, 8, 2, 1, 1, '2024-09-01'),
(6, 4, 6, 1, 1, '2024-09-01'),
(5, 2, 3, 1, 1, '2024-09-14'),
(1, 6, 1, 1, 1, '2024-09-15'),
(8, 3, 4, 1, 1, '2024-09-15'),
(7, 5, 8, 1, 1, '2024-09-21'),
(2, 10, 5, 1, 1, '2024-09-22'),
(1, 8, 1, 1, 1, '2024-09-22'),
(3, 4, 2, 1, 1, '2024-09-28'),
(6, 7, 6, 1, 1, '2024-09-29'),
(5, 1, 3, 1, 1, '2024-09-29');

-- ============================================
-- Insertion: dim_event_type
-- ============================================
INSERT INTO dim_event_type (event_type_name) VALUES
('Goal'),
('Yellow Card'),
('Red Card'),
('Substitution Out'),
('Substitution In');

-- ============================================
-- Insertion: fact_event (Match 1: Man City 2-1 Arsenal)
-- ============================================
INSERT INTO fact_event (fk_match_id, fk_player_id, fk_team_id, fk_event_type_id, event_minute) VALUES
-- Buts
(1, 1, 1, 1, '23'),
(1, 3, 1, 1, '67'),
(1, 11, 2, 1, '45+2'),
-- Cartons jaunes
(1, 4, 1, 2, '34'),
(1, 13, 2, 2, '56'),
(1, 16, 2, 2, '78'),
-- Remplacements
(1, 5, 1, 4, '72'),
(1, 6, 1, 5, '72'),
(1, 12, 2, 4, '65'),
(1, 15, 2, 5, '65');

-- ============================================
-- Insertion: fact_event (Match 2: Liverpool 3-1 Chelsea)
-- ============================================
INSERT INTO fact_event (fk_match_id, fk_player_id, fk_team_id, fk_event_type_id, event_minute) VALUES
-- Buts
(2, 21, 3, 1, '12'),
(2, 21, 3, 1, '44'),
(2, 24, 3, 1, '73'),
(2, 31, 6, 1, '58'),
-- Cartons jaunes
(2, 26, 3, 2, '38'),
(2, 35, 6, 2, '67'),
-- Remplacements
(2, 22, 3, 4, '80'),
(2, 30, 3, 5, '80'),
(2, 32, 6, 4, '70'),
(2, 40, 6, 5, '70');

-- ============================================
-- Insertion: fact_event (Match 3: Tottenham 2-2 Brentford)
-- ============================================
INSERT INTO fact_event (fk_match_id, fk_player_id, fk_team_id, fk_event_type_id, event_minute) VALUES
-- Buts
(3, 41, 5, 1, '15'),
(3, 42, 5, 1, '62'),
-- Cartons jaunes
(3, 43, 5, 2, '45'),
(3, 44, 5, 2, '88');

-- ============================================
-- Insertion: fact_event (Match 4: Man United 1-0 Brighton)
-- ============================================
INSERT INTO fact_event (fk_match_id, fk_player_id, fk_team_id, fk_event_type_id, event_minute) VALUES
-- But
(4, 41, 8, 1, '35'),
-- Carton rouge
(4, 42, 8, 3, '77'),
-- Remplacements
(4, 43, 8, 4, '68'),
(4, 45, 8, 5, '68');

-- ============================================
-- Insertion: fact_event (Match 5: Arsenal 3-0 Newcastle)
-- ============================================
INSERT INTO fact_event (fk_match_id, fk_player_id, fk_team_id, fk_event_type_id, event_minute) VALUES
-- Buts
(5, 11, 2, 1, '18'),
(5, 13, 2, 1, '40'),
(5, 15, 2, 1, '82'),
-- Cartons jaunes
(5, 14, 2, 2, '54');

-- ============================================
-- Insertion: fact_match_summary
-- ============================================
INSERT INTO fact_match_summary (fk_match_id, fk_team_id, summary_possession_pct, summary_shots, summary_shots_on_target, summary_passes, summary_pass_accuracy, summary_fouls, summary_corners, summary_goals) VALUES
-- Match 1: Man City vs Arsenal
(1, 1, 58, 18, 8, 612, 89, 11, 6, 2),
(1, 2, 42, 12, 5, 478, 85, 14, 4, 1),
-- Match 2: Liverpool vs Chelsea
(2, 3, 55, 20, 10, 587, 87, 9, 7, 3),
(2, 6, 45, 14, 6, 495, 83, 12, 5, 1),
-- Match 3: Tottenham vs Brentford
(3, 5, 52, 16, 7, 543, 86, 10, 6, 2),
(3, 15, 48, 13, 6, 501, 84, 11, 4, 2),
-- Match 4: Man United vs Brighton
(4, 8, 47, 11, 4, 456, 81, 13, 3, 1),
(4, 10, 53, 15, 5, 567, 88, 9, 5, 0),
-- Match 5: Arsenal vs Newcastle
(5, 2, 61, 22, 11, 645, 90, 8, 8, 3),
(5, 7, 39, 9, 3, 402, 79, 14, 2, 0),
-- Match 6: Chelsea vs West Ham
(6, 6, 56, 17, 8, 589, 86, 10, 6, 2),
(6, 9, 44, 11, 4, 468, 82, 13, 4, 1),
-- Match 7: Man City vs Liverpool
(7, 1, 54, 19, 9, 598, 88, 10, 7, 2),
(7, 3, 46, 16, 7, 512, 85, 11, 5, 2),
-- Match 8: Aston Villa vs Tottenham
(8, 4, 49, 14, 6, 523, 84, 12, 5, 1),
(8, 5, 51, 15, 7, 541, 85, 11, 6, 1),
-- Match 9: Arsenal vs Man City
(9, 2, 48, 13, 6, 501, 86, 13, 4, 1),
(9, 1, 52, 17, 8, 573, 89, 10, 7, 2),
-- Match 10: Liverpool vs Man United
(10, 3, 59, 21, 10, 621, 88, 9, 8, 3),
(10, 8, 41, 10, 3, 431, 80, 15, 3, 0),
-- Match 11: Chelsea vs Aston Villa
(11, 6, 53, 16, 7, 562, 87, 11, 6, 2),
(11, 4, 47, 13, 5, 498, 83, 13, 4, 1),
-- Match 12: Tottenham vs Arsenal
(12, 5, 46, 14, 6, 487, 83, 14, 5, 1),
(12, 2, 54, 18, 9, 576, 88, 10, 7, 2),
-- Match 13: Man City vs Chelsea
(13, 1, 60, 20, 9, 634, 90, 8, 8, 3),
(13, 6, 40, 11, 4, 423, 81, 13, 3, 1),
-- Match 14: Man United vs Liverpool
(14, 8, 44, 12, 5, 467, 82, 14, 4, 1),
(14, 3, 56, 19, 9, 593, 87, 10, 7, 2),
-- Match 15: Newcastle vs Tottenham
(15, 7, 51, 15, 6, 534, 85, 11, 5, 2),
(15, 5, 49, 14, 7, 521, 84, 12, 6, 2),
-- Match 16: Arsenal vs Brighton
(16, 2, 62, 23, 11, 658, 91, 7, 9, 4),
(16, 10, 38, 8, 2, 389, 78, 15, 2, 0),
-- Match 17: Man City vs Man United
(17, 1, 64, 24, 12, 679, 91, 6, 10, 3),
(17, 8, 36, 7, 2, 371, 76, 16, 2, 0),
-- Match 18: Liverpool vs Aston Villa
(18, 3, 57, 20, 10, 603, 88, 9, 8, 3),
(18, 4, 43, 12, 5, 456, 82, 13, 4, 1),
-- Match 19: Chelsea vs Newcastle
(19, 6, 55, 18, 8, 581, 87, 10, 7, 2),
(19, 7, 45, 13, 5, 478, 83, 12, 5, 1),
-- Match 20: Tottenham vs Man City
(20, 5, 41, 11, 4, 435, 81, 15, 3, 1),
(20, 1, 59, 21, 10, 627, 89, 9, 8, 3);