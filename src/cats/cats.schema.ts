import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/comments.schema';

const options: SchemaOptions = {
  collection: 'cats',
  timestamps: true, //DB 에서 업데이트된 일자, 시각, 등등의 로그를 남겨줌
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'abc@kakao.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'abc',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '23432',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20160424_68%2Fykangdw_146145744770637i9N_JPEG%2F740_20160423_223319.jpg&type=sc960_832',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

// export const CatSchema = SchemaFactory.createForClass(Cat);

// /** Mongodb 에서는 Vertual 필드를 제공해주며, 이것을 이용하여 Password 필드를 숨길 수 있다. */
// CatSchema.virtual('readOnlyData').get(function (this: Cat) {
//   return {
//     id: this.id,
//     email: this.email,
//     name: this.name,
//     imgUrl: this.imgUrl,
//   };
// });

const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments', //해당 Schema 이름
  localField: '_id', //
  foreignField: 'info', //외래필드 comments 에서 info 에 대해 댓글 을 가지고 옴
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
