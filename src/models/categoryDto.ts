export default class CategoryDto {
  constructor(
    public id: number,
    public name: string,
    public image: string | null,
    public createdAt: Date,
  ) {}
}
