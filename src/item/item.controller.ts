import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ItemLike, ItemService } from './item.service';
import { ItemType } from './enums';

@Controller('item')
export class ItemController {
  constructor(private readonly _itemService: ItemService) {}

  @Post()
  async create(@Body() itemDto: ItemLike): Promise<ItemLike> {
    return this._itemService.add(itemDto);
  }

  @Get()
  async find(@Query('type') type: string): Promise<ItemLike[]> {
    return this._itemService.find(parseInt(type, 10));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<ItemLike> {
    const item = await this._itemService.get(parseInt(id, 10));

    if (typeof item === 'undefined') {
      throw new NotFoundException('Item not found');
    }

    return item;
  }

  @Put(':id')
  async update(@Param('id') id: string, itemDto: ItemLike): Promise<ItemLike> {
    const item = await this._itemService.update(parseInt(id, 10), itemDto);

    if (typeof item === 'undefined') {
      throw new NotFoundException();
    }

    return item;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const success = await this._itemService.remove(parseInt(id, 10));

    if (!success) {
      throw new NotFoundException();
    }
  }
}
