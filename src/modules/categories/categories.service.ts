import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../../database/models/entities';
import { Repository } from 'typeorm';
import { AddCategoryDto } from './dtos/add-category.dto';
import { ApiError } from 'src/common/classes/api-error';
import { ErrorCode } from 'src/common/constants/errors';

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
}
