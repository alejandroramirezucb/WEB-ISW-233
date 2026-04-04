import { commandManager } from './CommandManager.js';
import {
  AddToCartCommand,
  RemoveFromCartCommand,
} from './commands/cartCommands.js';

export async function addToCart(id) {
  await commandManager.execute(new AddToCartCommand(id, app.store));
}

export async function removeFromCart(id) {
  await commandManager.execute(new RemoveFromCartCommand(id, app.store));
}

export async function undoLastCartAction() {
  return await commandManager.undo();
}

export function canUndoCartAction() {
  return commandManager.canUndo();
}
