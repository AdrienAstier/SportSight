package fr.sportsight.api.service;

import fr.sportsight.api.entity.Match;
import fr.sportsight.api.entity.Player;
import fr.sportsight.api.repository.MatchRepository;
import fr.sportsight.api.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {

    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {

        this.matchRepository = matchRepository;
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Match getMatchById(int id) {
        return matchRepository.findById(id).orElse(null);
    }
}