import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    let userexist = await this.usersService.findOne(id)
    console.log("users",userexist);
    if(!userexist){
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let userexist = await this.usersService.findOne(id)
    console.log("users",userexist);
    if(!userexist){
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let userexist = await this.usersService.findOne(id)
    console.log("users",userexist);
    if(!userexist){
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersService.remove(id);
  }
}
