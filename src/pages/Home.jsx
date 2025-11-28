export default function Home({ goToOrder }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-#292929 mb-5">Teknolojik Yemekler</h1>
      <button
        onClick={goToOrder}
        className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition"
      >
        Sipariş Ver
      </button>
    </div>
  );
}
