import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../../database/models/entities';
import { Repository } from 'typeorm';
import { AddCategoryDto } from './dtos/add-category.dto';
import { ApiError } from 'src/common/classes/api-error';
import { ErrorCode } from 'src/common/constants/errors';
import { GetListCategoriesDto } from './dtos/get-list-categories.dto';

export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async addCategory(request: AddCategoryDto): Promise<Categories> {
    const existedCategory = await this.categoriesRepository.findOneBy({
      name: request.name,
    });

    if (existedCategory) throw ApiError.error(ErrorCode.EXISTED_CATEGORY);
    const category = this.categoriesRepository.create(request);
    return await this.categoriesRepository.save(category);
  }

  async getListCategories(request: GetListCategoriesDto) {
    const { limit, offset } = request;
    const [categories, total] = await this.categoriesRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: offset,
    });

    return { categories, total };
  }
}
