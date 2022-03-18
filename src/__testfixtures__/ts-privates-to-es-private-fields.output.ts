export class Fruit {
  #banana: string = 'banana';
  _apple: string = 'apple';

  get banana(): string {
    return this.#banana;
  }
  set banana(banana: string) {
    this.#banana = banana;
  }

  get apple(): string {
    return this._apple;
  }
  set apple(apple: string) {
    this._apple = apple;
  }
}
