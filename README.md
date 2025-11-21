# SportSight-Sports-Performance-Analytics-Platform

Une plateforme complète d’analyse sportive (end-to-end) utilisant SQL, dbt, Python et Power BI / Streamlit.  
SportSight ingère des données de matchs et de joueurs, les transforme proprement, génère des métriques avancées (xG, KPIs joueurs/équipes, tendance de forme…), et expose des visualisations interactives ainsi qu’une API légère.

---

## Objectifs du projet

- Construire un pipeline de données complet :
  - **Ingestion**
  - **Transformation (ELT) avec dbt**
  - **Stockage en modèle en étoile**
  - **Analyses statistiques & Machine Learning**
  - **Dashboard interactif**
  - **API pour exposer les résultats**

- Simuler un environnement professionnel de Data Analyst / Data Engineer.
- Développer des insights utiles pour un staff technique, des analystes ou des recruteurs.

---

## Stack Technique

| Domaine | Outils |
|--------|--------|
| Ingestion | Python, pandas |
| Stockage | MySQL (Docker) |
| Transformation | dbt |
| Analyses | Python, pandas, numpy, scikit-learn, statsmodels |
| Visualisation | Power BI / Tableau / Streamlit |
| API | Django REST Framework / FastAPI |
| Documentation | dbt Docs + README |

---

## Architecture du Pipeline

Raw Data (CSV/API)
          ↓
Python Ingestion Scripts
          ↓
MySQL (raw)
          ↓
dbt Staging
          ↓
dbt Intermediate
          ↓
dbt Marts (facts/dims)
          ↓
Python Analytics & ML Models
          ↓
Power BI / Streamlit Dashboards
          ↓
REST API (KPIs & stats)

---

## Modèle de Données (Star Schema)

### Tables de dimensions
- `dim_player`
- `dim_team`
- `dim_match`
- `dim_date`

### Tables de faits
- `fact_event` — événements par joueur par match  
- `fact_match_summary` — résumé statistique par équipe par match

Ce modèle permet des analyses :
- par joueur  
- par équipe  
- par match  
- par saison  
- temporelles  

---

## KPIs Calculés

### Joueurs
- Goals per 90  
- Assists per 90  
- Expected Goals (xG)  
- Pass accuracy  
- Dribble success %  
- Pressing efficiency  

### Équipes
- Expected Points (xP)  
- Possession moyenne  
- Shot conversion rate  
- xG vs goals (efficacité réelle)  
- Forme (rolling averages sur 5 matchs)

---

## Analyses & Modèles

### Analyses statistiques
- Distributions & boxplots  
- Corrélations (xG ↔ buts, passes ↔ victoires)  
- Comparaisons de joueurs par poste  
- Heatmaps de positions (si coordonnées disponibles)

### Modèles Machine Learning
- **Prédiction du résultat d’un match** (classification)  
- **Prédiction du but attendu d’un joueur** (régression)  
- **Clustering** de joueurs (styles de jeu)  

---

## Dashboards

### Pages principales :
1. **Overview de la saison**
2. **Analyse joueur** (radar charts, rolling form)
3. **Analyse équipe** (KPIs, tendances)
4. **Explorateur de match**
5. **Insights ML**

Exemples de visualisations :
- Courbes de tendance (goals per match)  
- Radar chart (profil d’un joueur)  
- Carte de tirs (x,y)  
- Scatter plot xG vs goals  

---

## API (optionnelle)

Endpoints exemples :
- `/api/top_scorers`
- `/api/team_kpis/<team_id>`
- `/api/player/<player_id>/performance`
- `/api/prediction/<match_id>`

---

## Structure du projet

sportsight/
├── data/
│ ├── raw/
│ ├── processed/
│ └── external/
├── dbt/
│ ├── models/
│ │ ├── staging/
│ │ ├── intermediate/
│ │ └── marts/
│ └── tests/
│
├── notebooks/
│ ├── 01_eda.ipynb
│ ├── 02_feature_engineering.ipynb
│ ├── 03_modeling.ipynb
│ └── 04_visualizations.ipynb
│
├── dashboard/
│ └── streamlit_app.py (ou .pbix si Power BI)
│
├── api/
│ ├── main.py (FastAPI)
│ └── requirements.txt
│
└── README.md

yaml
Copier le code

---

## Mise en place rapide

**Cloner le projet**  
git clone https://github.com/tonpseudo/SportSight
cd SportSight

**Démarrer MySQL avec Docker**

docker-compose up -d

**Installer Python**

pip install -r requirements.txt

**Compiler dbt**

dbt run
dbt test

**Lancer le dashboard**

streamlit run dashboard/streamlit_app.py

## Licence

Projet open-source sous licence MIT.

## Auteur

Développé par Adrien ASTIER.
