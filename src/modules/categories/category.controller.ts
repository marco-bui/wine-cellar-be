import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AddCategoryDto } from './dtos/add-category.dto';
import { ApiResult } from '../../common/classes/api-result';
import { Role } from '../../common/decorators/roles.decorator';
import { Categories, Roles } from '../../database/models/entities';
import { AuthGuard } from '@nestjs/passport';
import { GetListCategoriesDto } from './dtos/get-list-categories.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Role(Roles.ADMIN)
  @ApiOkResponse({ type: Categories })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  async addCategory(@Body() body: AddCategoryDto) {
    const response = await this.categoriesService.addCategory(body);
    return new ApiResult().success(response);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: Categories })
  async getListCategories(@Param() params: GetListCategoriesDto) {
    const response = await this.categoriesService.getListCategories(params);
    return new ApiResult().success(response);
  }
}
