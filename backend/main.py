import os
import pandas as pd
import numpy as np
import tensorflow as tf
import streamlit as st
from PIL import Image
from io import BytesIO

# ---------- optional translation (works even if package missing) ----------
try:
    from deep_translator import GoogleTranslator  # pip install deep-translator
    def translate(txt: str, lang: str) -> str:
        if not txt or lang == "en":
            return txt
        try:
            return GoogleTranslator(source="auto", target=lang).translate(txt)
        except Exception:
            return txt
except Exception:
    def translate(txt: str, lang: str) -> str:  # no-op fallback
        return txt

LANGS = {
    "English": "en",
    "हिन्दी (Hindi)": "hi",
    "বাংলা (Bengali)": "bn",
    "తెలుగు (Telugu)": "te",
    "தமிழ் (Tamil)": "ta",
    "मराठी (Marathi)": "mr",
    "ગુજરાતી (Gujarati)": "gu",
    "ಕನ್ನಡ (Kannada)": "kn",
    "മലയാളം (Malayalam)": "ml",
    "ਪੰਜਾਬੀ (Punjabi)": "pa",
    "ଓଡ଼ିଆ (Odia)": "or",
    "অসমীয়া (Assamese)": "as",
}

# ------------------- Model -------------------
@st.cache_resource
def load_model():
    return tf.keras.models.load_model("trained_plant_disease_model.keras")

MODEL = load_model()

def predict_from_pil(pil_img):
    img = pil_img.resize((128, 128))
    arr = tf.keras.preprocessing.image.img_to_array(img)
    arr = np.expand_dims(arr, 0)
    preds = MODEL.predict(arr, verbose=0)
    idx = int(np.argmax(preds[0]))
    conf = float(preds[0][idx])
    return idx, conf

# ------------------- Labels -------------------
CLASS_NAME = [
    'Apple___Apple_scab','Apple___Black_rot','Apple___Cedar_apple_rust','Apple___healthy',
    'Blueberry___healthy','Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy','Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_','Corn_(maize)___Northern_Leaf_Blight','Corn_(maize)___healthy',
    'Grape___Black_rot','Grape___Esca_(Black_Measles)','Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy','Orange___Haunglongbing_(Citrus_greening)','Peach___Bacterial_spot',
    'Peach___healthy','Pepper,_bell___Bacterial_spot','Pepper,_bell___healthy',
    'Potato___Early_blight','Potato___Late_blight','Potato___healthy',
    'Raspberry___healthy','Soybean___healthy','Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch','Strawberry___healthy','Tomato___Bacterial_spot',
    'Tomato___Early_blight','Tomato___Late_blight','Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot','Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot','Tomato___Tomato_Yellow_Leaf_Curl_Virus','Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

# ------------------- Solutions -------------------
DEFAULT_SOLUTIONS = {
    'Apple___Apple_scab': "Remove infected leaves, prune for airflow, apply captan or mancozeb at green tip–petal fall.",
    'Apple___Black_rot': "Prune cankers, remove mummified fruit, apply captan or thiophanate-methyl; sanitize orchard floor.",
    'Apple___Cedar_apple_rust': "Remove nearby junipers, plant resistant cultivars, spray myclobutanil around pink to petal fall.",
    'Apple___healthy': "Healthy. Maintain sanitation, balanced fertilization, and regular scouting.",
    'Blueberry___healthy': "Healthy. Mulch, drip irrigate, and monitor for leaf spots.",
    'Cherry_(including_sour)___Powdery_mildew': "Prune for light, avoid excess nitrogen, apply sulfur or potassium bicarbonate at first sign.",
    'Cherry_(including_sour)___healthy': "Healthy. Keep canopy open, remove fallen leaves.",
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': "Rotate away from corn, use resistant hybrids, apply fungicide at VT if disease pressure is high.",
    'Corn_(maize)___Common_rust_': "Plant resistant hybrids; fungicide at VT/R1 only if severe and hybrids are susceptible.",
    'Corn_(maize)___Northern_Leaf_Blight': "Rotate crops, choose resistant hybrids, fungicide near tassel if lesions on upper leaves.",
    'Corn_(maize)___healthy': "Healthy. Maintain residue management and scouting.",
    'Grape___Black_rot': "Remove mummies, open canopy, fungicides like myclobutanil or captan from 3–5 inch shoots to bunch closure.",
    'Grape___Esca_(Black_Measles)': "Remove and destroy symptomatic wood, avoid trunk wounds, manage water stress.",
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': "Improve airflow, remove infected leaves, apply protectant fungicides early.",
    'Grape___healthy': "Healthy. Prune properly and manage irrigation.",
    'Orange___Haunglongbing_(Citrus_greening)': "Control psyllid vector, remove infected trees, plant certified disease-free stock.",
    'Peach___Bacterial_spot': "Plant tolerant cultivars, copper early season, avoid overhead irrigation, remove infected twigs.",
    'Peach___healthy': "Healthy. Thin fruit and prune for airflow.",
    'Pepper,_bell___Bacterial_spot': "Use certified seed/transplants, rotate 2–3 years, copper plus mancozeb at first symptoms.",
    'Pepper,_bell___healthy': "Healthy. Avoid leaf wetness; scout weekly.",
    'Potato___Early_blight': "Use certified seed, rotate 2+ years, apply chlorothalonil/mancozeb/diflufenican when lesions appear.",
    'Potato___Late_blight': "Destroy volunteers, avoid overhead irrigation, apply cymoxanil/mandipropamid; rogue infected plants.",
    'Potato___healthy': "Healthy. Hill soil and manage irrigation.",
    'Raspberry___healthy': "Healthy. Prune out old canes and improve airflow.",
    'Soybean___healthy': "Healthy. Rotate crops and select resistant varieties.",
    'Squash___Powdery_mildew': "Plant resistant varieties, apply sulfur or chlorothalonil at first powdery patches.",
    'Strawberry___Leaf_scorch': "Remove infected leaves after harvest, improve airflow, apply captan if needed.",
    'Strawberry___healthy': "Healthy. Drip irrigate and mulch.",
    'Tomato___Bacterial_spot': "Use copper bactericides, remove debris, avoid working wet plants; rotate 1–2 years.",
    'Tomato___Early_blight': "Mulch, avoid overhead irrigation, apply chlorothalonil/mancozeb on schedule when conditions favor disease.",
    'Tomato___Late_blight': "Immediately remove infected plants, protect with chlorothalonil or cyazofamid; avoid leaf wetness.",
    'Tomato___Leaf_Mold': "Improve ventilation, reduce humidity, apply copper or chlorothalonil; sanitize greenhouse.",
    'Tomato___Septoria_leaf_spot': "Remove lower infected leaves, mulch, apply chlorothalonil weekly during outbreaks.",
    'Tomato___Spider_mites Two-spotted_spider_mite': "Rinse undersides of leaves, release predatory mites if available, use abamectin or horticultural oils.",
    'Tomato___Target_Spot': "Rotate, improve airflow, apply azoxystrobin or chlorothalonil when spotting begins.",
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus': "Control whiteflies, use resistant cultivars, remove infected plants quickly.",
    'Tomato___Tomato_mosaic_virus': "Disinfect tools, avoid tobacco contamination, use resistant varieties.",
    'Tomato___healthy': "Healthy. Stake plants, prune lower leaves, and monitor weekly."
}

def load_solutions():
    if os.path.exists("solutions.csv"):
        df = pd.read_csv("solutions.csv")
        d = dict(zip(df["disease"], df["solution"]))
        return {k: d.get(k, DEFAULT_SOLUTIONS.get(k, "No remedy available.")) for k in CLASS_NAME}
    return DEFAULT_SOLUTIONS

SOLUTIONS = load_solutions()

def solutions_csv_bytes():
    df = pd.DataFrame({"disease": CLASS_NAME,
                       "solution": [SOLUTIONS.get(c, "") for c in CLASS_NAME]})
    return df.to_csv(index=False).encode("utf-8")

# ------------------- Pesticides (+images) -------------------
# Rename to avoid accidental overwrite; MUST be a dict.
PESTICIDE_MAP = {
    "Potato___Early_blight": [
        {"name": "Chlorothalonil 75% WP", "ai": "chlorothalonil",
         "dose": "2.0–2.5 g/L water", "phi": "7 days", "img": "pesticides/chlorothalonil.jpg"},
        {"name": "Mancozeb 75% WP", "ai": "mancozeb",
         "dose": "2.0–2.5 g/L water", "phi": "7 days", "img": "pesticides/mancozeb.jpg"},
    ],
    "Tomato___Late_blight": [
        {"name": "Cyazofamid 34.5% SC", "ai": "cyazofamid",
         "dose": "0.5–0.7 ml/L", "phi": "3–7 days", "img": "pesticides/cyazofamid.jpg"},
        {"name": "Chlorothalonil 75% WP", "ai": "chlorothalonil",
         "dose": "2.0 g/L", "phi": "7 days", "img": "pesticides/chlorothalonil.jpg"},
    ],
    "Apple___Apple_scab": [
        {"name": "Captan 50% WP", "ai": "captan",
         "dose": "2.0 g/L", "phi": "7 days", "img": "pesticides/captan.jpg"},
        {"name": "Mancozeb 75% WP", "ai": "mancozeb",
         "dose": "2.0–2.5 g/L", "phi": "7 days", "img": "pesticides/mancozeb.jpg"},
    ],
    "Squash___Powdery_mildew": [
        {"name": "Sulfur 80% WP", "ai": "sulfur",
         "dose": "2.0–3.0 g/L", "phi": "1–3 days", "img": "pesticides/sulfur.jpg"},
        {"name": "Potassium bicarbonate 85% WP", "ai": "KHCO₃",
         "dose": "5–10 g/L", "phi": "0 days", "img": "pesticides/potassium_bicarb.jpg"},
    ],
    "Tomato___Bacterial_spot": [
        {"name": "Copper oxychloride 50% WP", "ai": "copper",
         "dose": "2.0–3.0 g/L", "phi": "3–5 days", "img": "pesticides/copper.jpg"},
        {"name": "Copper hydroxide 77% WP", "ai": "copper",
         "dose": "2.0 g/L", "phi": "3–5 days", "img": "pesticides/copper.jpg"},
    ],
}
DEFAULT_PESTICIDES = [
    {"name": "Copper-based protectant", "ai": "copper",
     "dose": "2.0 g/L", "phi": "3–7 days", "img": "pesticides/copper.jpg"},
    {"name": "Chlorothalonil 75% WP", "ai": "chlorothalonil",
     "dose": "2.0 g/L", "phi": "7 days", "img": "pesticides/chlorothalonil.jpg"},
]

def render_pesticides(label: str, lang: str):
    db = PESTICIDE_MAP if isinstance(PESTICIDE_MAP, dict) else {}
    items = db.get(label, DEFAULT_PESTICIDES)
    st.subheader(translate("Pesticides (reference rates)", lang))
    cols = st.columns(min(3, max(1, len(items))))
    for i, item in enumerate(items):
        with cols[i % len(cols)]:
            img_path = item.get("img")
            if img_path and os.path.exists(img_path):
                st.image(img_path, use_container_width=True)
            st.markdown(f"**{translate(item['name'], lang)}**")
            st.caption(translate(f"Active ingredient: {item['ai']}", lang))
            st.write(translate(f"Rate: {item['dose']}  •  PHI: {item['phi']}", lang))
    st.caption(translate("Always follow local regulations and the product label. Rotate FRAC modes to manage resistance.", lang))

# ------------------- UI -------------------
st.sidebar.title("EcoVision")
app_mode = st.sidebar.selectbox("Select Page", ["DISEASE RECOGNITION"])

# language selector
lang_name = st.sidebar.selectbox("Language", list(LANGS.keys()), index=0)
LANG = LANGS[lang_name]

# top image(s) if present
if os.path.exists("Diseases.jpeg"):
    st.image(Image.open("Diseases.jpeg"))
if os.path.exists("Diseases.png"):
    st.image(Image.open("Diseases.png"))

if app_mode == "DISEASE RECOGNITION":
    st.header(translate("DISEASE RECOGNITION", LANG))
    up = st.file_uploader(translate("Choose an Image:", LANG), type=["jpg", "jpeg", "png"])

    # auto-show uploaded image
    pil_img = None
    if up is not None:
        pil_img = Image.open(BytesIO(up.read())).convert("RGB")
        st.image(pil_img, use_container_width=True)

    if st.button(translate("Predict", LANG), disabled=(pil_img is None)):
        st.subheader(translate("Our Prediction", LANG))
        idx, conf = predict_from_pil(pil_img)
        label = CLASS_NAME[idx]
        st.success(translate(f"Model is Predicting it's a {label}  (confidence {conf:.2f})", LANG))

        st.subheader(translate("Recommended Solution", LANG))
        st.info(translate(SOLUTIONS.get(label, "No remedy available."), LANG))

        # pesticides section with images
        render_pesticides(label, LANG)

# (optional) expose solutions.csv download
# st.download_button("Download solutions.csv", data=solutions_csv_bytes(),
#                    file_name="solutions.csv", mime="text/csv")