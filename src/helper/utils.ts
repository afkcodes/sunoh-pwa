type Sheet = { id: string; close: () => void };

export const sheetStackHandler = {
  stack: [] as Sheet[],
  add: function (sheet: Sheet) {
    const isAlreadyInStack = this.stack.some((sheetItem) => sheetItem.id === sheet.id);
    if (!isAlreadyInStack) {
      this.stack.push(sheet);
    }
    console.log(sheet, this.stack);
  },
  remove: function (sheet: Sheet) {
    this.stack = this.stack.filter((sheetItem) => sheetItem.id !== sheet.id);
  },
  getTopSheet: function () {
    return this.stack[this.stack.length - 1];
  },
  get: function (id: string) {
    return this.stack.find((sheetItem) => sheetItem.id === id);
  },
};
