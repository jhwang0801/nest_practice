import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catService: CatsService,
  ) {}
}

// 강의 예시
// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   // * localhost:8000/cats/hello
//   @Get('hello/:id/:name')
//   getHello(@Req() req: Request, @Body() Body, @Param() param): string {
//     // console.log(req);
//     // console.log(param);
//     return this.appService.getHello();
//   }
// }
