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

## 🗂️ Architecture du Pipeline

