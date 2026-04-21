export default function ProductSelector({ products, cart, onAdd, onRemove, onQtyChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {products.map((product) => {
        const cartItem = cart.find(c => c.id === product.id);
        return (
          <div
            key={product.id}
            className="p-4 border border-input rounded-lg hover:bg-blue-50 transition"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-foreground">{product.name}</p>
                <p className="text-sm text-muted-foreground">€{product.price.toFixed(2)}</p>
              </div>
            </div>
            {cartItem ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onQtyChange(product.id, cartItem.qty - 1)}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                >
                  −
                </button>
                <span className="flex-1 text-center font-medium">{cartItem.qty}</span>
                <button
                  onClick={() => onQtyChange(product.id, cartItem.qty + 1)}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                >
                  +
                </button>
                <button
                  onClick={() => onRemove(product.id)}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                >
                  Rimuovi
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAdd(product)}
                className="w-full px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium transition-all"
              >
                Aggiungi al carrello
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}