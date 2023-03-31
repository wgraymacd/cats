import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, UseFilters, ParseIntPipe } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { ForbiddenException } from 'src/common/exceptions/forbidden.exception';

@Controller('cats')
// @UseFliters(HttpExceptionFilter) so filter is used for all route handlers in CatsController
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }
    // exception filter
    // @UseFilters(HttpExceptionFilter)
    // async create(@Body() createCatDto: CreateCatDto) {
    //     throw new ForbiddenException();
    // }

    @Get()
    async findAll() {
        try {
            await this.catsService.findAll();
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    // async findAll(): Promise<Cat[]> {
    //     return this.catsService.findAll();
    // }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }
    // this function uses a pipe to process input arguments and handle exceptions before passing to findOne function
    // findOne(@Param('id', ParseIntPipe) id: number) {
    //     return this.catsService.findOne(id);
    // }
}
