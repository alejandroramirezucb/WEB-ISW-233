# WEB-ISW-233

## Patrones que se usaron

### 1. **Command**

Se uso para las acciones del carrito:

- `AddToCartCommand`: agregar producto
- `RemoveFromCartCommand`: eliminar un producto

**Archivos:**

- `services/CommandManager.js`
- `services/commands/cartCommands.js`

### 2. **Observer**

El **Proxy** de `services/Store.js` se usa como observer para detectar cambios del carrito.

### 3. **Strategy**

Se usa para que el almacenamiento pueda usarse con diferentes estrategias:

- `LocalStorageAdapter`: guardar en localStorage
- `MemoryStorageAdapter`: fallback en memoria

## Atajos

| Atajo          | Acción                    |
| -------------- | ------------------------- |
| `Ctrl/Cmd + Z` | Deshacer la ultima accion |
| `Alt + 1`      | Ir a Home                 |
| `Alt + 2`      | Ir a Productos            |
| `Alt + 3`      | Ir a Tu Pedido            |
