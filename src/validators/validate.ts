import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

export async function validate(
  schema: boolean | object,
  data: object,
): Promise<{
  valid: boolean;
  error?: string;
}> {
  const validator = ajv.compile(schema);
  const valid = await validator(data);

  return {
    valid,
    ...(!valid ? { error: ajv.errorsText(validator.errors) } : {}),
  };
}
