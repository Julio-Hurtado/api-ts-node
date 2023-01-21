export default class UserDto {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public rol: string,
    public createdAt: Date,
  ) {}
}
