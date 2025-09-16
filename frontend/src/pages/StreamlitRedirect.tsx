import { useEffect } from "react";

const STREAMLIT_URL = import.meta.env.VITE_STREAMLIT_URL ?? "http://localhost:8501";

export default function StreamlitRedirect() {
  useEffect(() => {
    window.location.replace(STREAMLIT_URL);
  }, []);
  return null;
}