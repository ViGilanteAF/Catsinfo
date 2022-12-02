import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadonlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '23483',
    description: 'id',
  })
  id: string;
}
