import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const model = new this.userModel();
    model.username = createUserDto.username
    model.age = createUserDto.age
    model.hobbies = createUserDto.hobbies
    return model.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({_id:id},{
      username:updateUserDto.username,
      age:updateUserDto.age,
      hobbies:updateUserDto.hobbies
    }).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id:id});
  }
}
