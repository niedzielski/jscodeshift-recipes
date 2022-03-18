export class Fruit {
  private _banana: string = 'banana';
  _apple: string = 'apple';

  get banana(): string {
    return this._banana;
  }
  set banana(banana: string) {
    this._banana = banana;
  }
  private _pickBanana(): void {this._pickBanana()}

  get apple(): string {
    return this._apple;
  }
  set apple(apple: string) {
    this._apple = apple;
  }
  _pickApple(): void {this._pickApple()}
}
