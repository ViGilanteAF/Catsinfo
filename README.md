# CatsInfo
> Catsinfo is Single Web site with Cats information and Imgae.
- Visite my [Project History](https://stronghu95.notion.site/9ddcfbbd49e7463788d638a8f500da7e) to view history.
- Use Nest.js and MongoDB

# Purpose
- Use Nest.js build Backend / Frontend
- Use RestAPI run Server and Client

# Environment
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

# Description
- Use Nest.js build Table and image.
- Start User may be Cats, Dog, like Pet
- Cat's Network in this Website User = Cat
- Catsinfo is age, name, email, bookmark, species, etc

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# Function & Logic
>SignUp &  Login & FileUpload & Comments
## [SignUp Service](https://github.com/ViGilanteAF/Catsinfo/blob/main/src/cats/services/cats.service.ts)
~~~javascript
async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
~~~

## [LoginService](https://github.com/ViGilanteAF/Catsinfo/blob/main/src/auth/auth.service.ts)
~~~javascript
@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    /**해당하는 Email 확인 */
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요!');
    }

    /**Passport 의 일치 여부 확인 */
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요!');
    }

    const payload = { email: email, sub: cat.id };

    return {
      data: { token: this.jwtService.sign(payload) },
    };
  }
}
~~~
## [FileUpload](https://github.com/ViGilanteAF/Catsinfo/blob/main/src/cats/controller/cats.controller.ts)
~~~javascript
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log(files);
    //return { image: `http://localhost:80000/media/cats/${files[0].filename}` };
    return this.catsService.uploadImg(cat, files);
  }
~~~
## [Comments](https://github.com/ViGilanteAF/Catsinfo/blob/main/src/cats/controller/cats.controller.ts)
~~~javascript
@ApiOperation({
    summary: '고양이 프로파일에 적힌 댓글 가지고오기!!',
  })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({
    summary: '특정 고양이 프로파일에 적힌 댓글 가지고오기!!',
  })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsService.createComment(id, body);
  }
~~~
---

# Development to do....
* It have to be use AWS Service. for the EC2, S3, RDS.
* ```Multer-extended``` Library is so useful, but it can's cover the lastest Nest.js version. <br> Need to find other multi file upload library.
* The data from Front-end is not a **Encryption**. It's week for Hacking. Need to Change data transport.
* If use ```Multer-extended``` uploading *.img .mp4 .mp3 ...* files need to check capacity problem. and Temp file System.
* There login system need to change PKI system.