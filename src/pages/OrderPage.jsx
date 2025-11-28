import { useState } from "react";
import axios from "axios";

export default function OrderPage({ submitOrder }) {
  const [form, setForm] = useState({
    isim: "",
    boyut: "",
    malzemeler: [],
    özel: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newMalzemeler = checked
        ? [...form.malzemeler, value]
        : form.malzemeler.filter((m) => m !== value);
      setForm({ ...form, malzemeler: newMalzemeler });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.isim.length < 3 || form.malzemeler.length < 4) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://reqres.in/api/pizza",
        form,
        { headers: { "x-api-key": "reqres-free-v1" } }
      );
      submitOrder(response.data);
    } catch (err) {
      setError("Sipariş gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Sipariş Formu</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="isim"
          placeholder="İsminiz"
          value={form.isim}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <div>
          <label className="mr-3">Boyut:</label>
          {["Küçük", "Orta", "Büyük"].map((size) => (
            <label key={size} className="mr-3">
              <input
                type="radio"
                name="boyut"
                value={size}
                checked={form.boyut === size}
                onChange={handleChange}
                className="mr-1"
              />
              {size}
            </label>
          ))}
        </div>

        <div>
          <label>Malzemeler (4-10 seçiniz):</label>
          {["Sucuk", "Peynir", "Mantar", "Zeytin", "Biber", "Soğan"].map((malzeme) => (
            <label key={malzeme} className="block">
              <input
                type="checkbox"
                name="malzemeler"
                value={malzeme}
                checked={form.malzemeler.includes(malzeme)}
                onChange={handleChange}
                className="mr-2"
              />
              {malzeme}
            </label>
          ))}
        </div>

        <textarea
          name="özel"
          placeholder="Notlarınız"
          value={form.özel}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading || form.isim.length < 3 || form.malzemeler.length < 4}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          {loading ? "Gönderiliyor..." : "Sipariş Ver"}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
