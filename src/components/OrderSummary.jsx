export default function OrderSummary({ customerName, customerEmail, company, cart, notes, subtotal, total, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Riepilogo Ordine</h1>
            <p className="text-sm text-muted-foreground">Verifica i dettagli dell'ordine</p>
          </div>
          <img src="https://media.base44.com/images/public/69e73a4aa2d612f40cefdd45/5548337a9_Logo_Quanta_System_Red_V1.png" alt="Quanta System" className="h-52 object-contain" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dati cliente */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">Dati Cliente</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Nome:</span> {customerName}</p>
                <p><span className="font-medium">Email:</span> {customerEmail}</p>
                {company && <p><span className="font-medium">Azienda:</span> {company}</p>}</p>
              </div>
            </div>

            {/* Prodotti */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">Prodotti</h2>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-3 border-b border-border last:border-b-0">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantità: {item.qty}</p>
                    </div>
                    <span className="font-medium">€{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            {notes && (
              <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                <h2 className="text-base font-semibold text-foreground mb-2">Note Aggiuntive</h2>
                <p className="text-sm text-foreground">{notes}</p>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white rounded-2xl shadow-sm border border-border p-6 space-y-4">
              <h2 className="text-base font-semibold text-foreground">Riepilogo Totale</h2>
              
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotale</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-foreground pt-2 border-t border-border">
                  <span>Totale</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onBack}
                className="w-full bg-secondary text-foreground font-semibold py-2.5 rounded-xl text-sm transition-all hover:bg-secondary/70"
              >
                ← Modifica Ordine
              </button>

              <button
                className="w-full bg-primary text-white font-semibold py-2.5 rounded-xl text-sm transition-all hover:bg-primary/90"
              >
                Invia Ordine →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}