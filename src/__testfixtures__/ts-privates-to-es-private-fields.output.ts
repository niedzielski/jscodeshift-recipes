export class Fruit {
  #banana: string = 'banana';
  _apple: string = 'apple';

  get banana(): string {
    return this.#banana;
  }
  set banana(banana: string) {
    this.#banana = banana;
  }
  #pickBanana(): void {this.#pickBanana()}

  get apple(): string {
    return this._apple;
  }
  set apple(apple: string) {
    this._apple = apple;
  }
  _pickApple(): void {this._pickApple()}
}
