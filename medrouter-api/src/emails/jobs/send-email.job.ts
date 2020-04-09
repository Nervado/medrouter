export class EmailJob {
  constructor(
    public name: string,
    public data: { [keys: string]: any },
    public opts: { [keys: string]: any },
  ) {}
  get() {
    return {
      name: this.name,
      data: this.data,
      opts: this.opts,
    };
  }
}
