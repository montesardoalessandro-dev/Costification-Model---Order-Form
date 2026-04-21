import { useState } from "react";
import ProductSelector from "../components/ProductSelector";
import OrderSummary from "../components/OrderSummary";

const ITEM_CATEGORIES = {
  OTTICA: { label: "OTTICA", color: "bg-blue-100 text-blue-700" },
  MECCANICA: { label: "MECCANICA", color: "bg-orange-100 text-orange-700" },
  IDRAULICA: { label: "IDRAULICA", color: "bg-teal-100 text-teal-700" },
};

const CATEGORIES = [
  {
    id: "fmc",
    label: "FMC",
    products: [
      { id: "p1", name: "Banco ottico", price: 0, categoria: "OTTICA" },
      { id: "p2", name: "Telaio", price: 0, categoria: "MECCANICA" },
      { id: "p3", name: "Braccio", price: 0, categoria: "MECCANICA" },
      { id: "p4", name: "Scheda di controllo", price: 0, categoria: "IDRAULICA" },
      { id: "p5", name: "PC", price: 0, categoria: "OTTICA" },
      { id: "p6", name: "Monitor", price: 0, categoria: "OTTICA" },
    ],
  },
];

export default function OrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [cart, setCart] = useState([]);
  const [notes, setNotes] = useState(");
  const [showSummary, setShowSummary] = useState(false);

  const handleAddProduct = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveProduct = (productId) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  };

  const handleQtyChange = (productId, qty) => {
    if (qty <= 0) return handleRemoveProduct(productId);
    setCart((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, qty } : i))
    );
  };

  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal;
  const canSubmit = customerName.trim() && customerEmail.trim() && cart.length > 0;

  if (showSummary) {
    return (
      <OrderSummary
        customerName={customerName}
        customerEmail={customerEmail}
        company={company}
        cart={cart}
        delivery={null}
        notes={notes}
        subtotal={subtotal}
        total={total}
        onBack={() => setShowSummary(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Costification Model</h1>
            <p className="text-sm text-muted-foreground">Seleziona i prodotti e visualizza il riepilogo</p>
          </div>
          <img src="https://media.base44.com/images/public/69e73a4aa2d612f40cefdd45/5548337a9_Logo_Quanta_System_Red_V1.png" alt="Quanta System" className="h-52 object-contain" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dati cliente */}
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
            <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
              Dati Cliente
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nome e Cognome *</label>
                <input
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Mario Rossi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                <input
                  type="email"
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="mario@esempio.it"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Azienda (opzionale)</label>
                <input
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Nome Azienda Srl"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Selezione prodotti */}
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
            <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
              Seleziona Prodotti
            </h2>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-white shadow-sm"
                      : "bg-secondary text-foreground hover:bg-secondary/70"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <ProductSelector
              products={currentCategory?.products || []}
              cart={cart}
              onAdd={handleAddProduct}
              onRemove={handleRemoveProduct}
              onQtyChange={handleQtyChange}
            />
          </div>

          {/* Note */}
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
            <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">3</span>
              Note Aggiuntive
            </h2>
            <textarea
              className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              rows={3}
              placeholder="Eventuali note sull'ordine o richieste speciali..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Right: Cart summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-white rounded-2xl shadow-sm border border-border p-6 space-y-4">
            <h2 className="text-base font-semibold text-foreground">FMC</h2>
            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Nessun prodotto selezionato</p>
            ) : (
              <div className="space-y-2">
                {cart.map((item) => {
                  const cat = ITEM_CATEGORIES[item.categoria];
                  return (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                      {cat && (
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded shrink-0 ${cat.color}`}>{cat.label}</span>
                      )}
                      <span className="text-foreground font-medium truncate flex-1">{item.name} <span className="text-muted-foreground">x{item.qty}</span></span>
                    </div>
                  );
                })}
              </div>
            )}

            {cart.length > 0 && (
              <>
                <hr className="border-border" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotale</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-foreground pt-1">
                    <span>Totale</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}

            <button
              disabled={!canSubmit}
              onClick={() => setShowSummary(true)}
              className="w-full bg-primary text-white font-semibold py-2.5 rounded-xl text-sm transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Visualizza Riepilogo →
            </button>
            {!canSubmit && (
              <p className="text-xs text-muted-foreground text-center">
                Compila nome, email e aggiungi almeno un prodotto
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
