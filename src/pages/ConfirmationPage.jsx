export default function ConfirmationPage({ data }) {
  if (!data) return <p>Sipariş bilgisi yok!</p>;

  return (
    <div className="max-w-xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Sipariş Onayı</h2>
      <p><strong>İsim:</strong> {data.isim}</p>
      <p><strong>Boyut:</strong> {data.boyut}</p>
      <p><strong>Malzemeler:</strong> {data.malzemeler.join(", ")}</p>
      <p><strong>Notlar:</strong> {data.özel}</p>
    </div>
  );
}
