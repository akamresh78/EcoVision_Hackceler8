# 🌱 EcoVision – AI-Powered Smart Farming Assistant  

EcoVision is an AI-powered web platform designed to help farmers detect crop diseases, optimize fertilizer use, and adopt sustainable farming practices. It aims to empower rural farmers with real-time, accessible, and eco-friendly solutions to improve crop yield and reduce environmental harm.  

---

## 🚜 Problem Statement  
Agriculture faces multiple challenges:  
- Crop diseases & pest attacks  
- Unpredictable weather conditions  
- Inefficient fertilizer usage  
- Lack of timely expert guidance  

Farmers, especially in rural areas, rely on traditional farming methods that often overuse chemical fertilizers and pesticides, leading to soil degradation, reduced yields, and economic losses.  

---

## 💡 Our Solution  
EcoVision provides:  

### 🌾 AI-Powered Crop Disease & Pest Detection  
- Farmers upload crop leaf/fruit images  
- AI model identifies disease/pest with a **confidence score** (e.g., *"Early blight detected with 92% confidence"*)  

### 🌿 Eco-Friendly Recommendations  
- Suggests **organic pesticides** and minimal-chemical alternatives  
- Provides **dosage & frequency** for safe application  

### 🧪 Fertilizer Optimization  
- Farmer inputs crop type & soil conditions  
- System recommends **balanced fertilizer usage** to prevent overuse  

### 🌍 Multilingual & Inclusive  
- Content available in **regional languages** (Google Translate API)  
- **Voice instructions** for illiterate farmers  

### 📊 Farmer Dashboard  
- History of diagnoses  
- Tracks improvements over time  
- Seasonal reports for better planning  

---

## 🛠️ Tech Stack  
| Layer        | Technology |
|-------------|-----------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend**  | Flask + Node.js |
| **Database** | MongoDB + Firebase |
| **AI/ML**    | TensorFlow + Flask integration |
| **APIs**     | OpenWeatherMap (weather), Google Translate / Microsoft Translator, Google Cloud Speech / Azure Cognitive Services |

---

## 📐 Architecture Overview  

```mermaid
graph TD
A[Farmer Uploads Image] --> B[Flask + TensorFlow Model]
B --> C[AI Model Identifies Disease/Pest]
C --> D[Backend (Node.js)]
D --> E[Database (MongoDB + Firebase)]
E --> F[Farmer Dashboard]
D --> G[API Integrations - Weather, Translate, Speech]
