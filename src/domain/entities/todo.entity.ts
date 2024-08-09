export class TodoEntity {
  constructor(
    public text: string,
    public id: string,
    public completed: Date | null
  ) {}

  public static fromObject(object:{[key:string]:any}): TodoEntity {
    const { text, id, completed } = object;
    return new TodoEntity(text, id, completed);
  }
}
