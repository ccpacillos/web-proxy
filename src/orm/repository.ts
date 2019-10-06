import {
  DeepPartial,
  FindConditions,
  ObjectLiteral,
  Repository,
  FindOneOptions,
} from 'typeorm';

export class CustomRepository<T> extends Repository<T> {
  constructor() {
    super();
  }

  async findOrCreate(
    where:
      | [FindConditions<T>]
      | FindConditions<T>
      | ObjectLiteral
      | string
      | DeepPartial<T>,
    defaults?: DeepPartial<T>,
  ): Promise<[T, boolean]> {
    const existing: T | undefined = await this.findOne({ where });
    if (existing) return [existing, false];

    const entity = await this.save(
      defaults || this.create(where as DeepPartial<T>),
    );
    return [entity, true];
  }

  async insertAndGet(params: DeepPartial<T>): Promise<T> {
    const entity = this.create(params);
    await this.insert(entity);
    return entity;
  }

  async assertExists(
    options?: FindOneOptions<T>,
    customError?: Error,
  ): Promise<T | never> {
    const entity = await this.findOne(options);
    const error = customError || new Error(`${this.target} not found.`);
    if (!entity) {
      throw error;
    }

    return entity;
  }
}
