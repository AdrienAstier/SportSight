import app.dashboard as st

st.title("Bienvenue dans SportSight")
st.write("Ceci est ton premier dashboard Streamlit !")

nom_joueur = st.text_input("Nom du joueur :")
if nom_joueur:
    st.write(f"Analyse pour {nom_joueur} viendra ici.")
