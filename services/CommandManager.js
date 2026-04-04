class CommandManager {
  constructor() {
    this.undoStack = [];
  }

  async execute(command) {
    await command.execute();
    if (command.canUndo) {
      this.undoStack.push(command);
      window.dispatchEvent(new Event('apphistorychange'));
    }
  }

  async undo() {
    if (!this.canUndo()) {
      return false;
    }

    const command = this.undoStack.pop();
    await command.undo();
    window.dispatchEvent(new Event('apphistorychange'));
    return true;
  }

  canUndo() {
    return this.undoStack.length > 0;
  }
}

export const commandManager = new CommandManager();
