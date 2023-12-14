// import { Test, TestingModule } from '@nestjs/testing';
// import { getModelToken } from '@nestjs/mongoose';
// import { LikeService } from './like.service';
// import { Like } from './entities/like.entity';

// describe('LikeService', () => {
//   let service: LikeService;
//   let model: any;

//   beforeEach(async () => {
//     model = {
//       findOne: jest.fn(),
//       findByIdAndDelete: jest.fn(),
//       save: jest.fn(),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         LikeService,
//         {
//           provide: getModelToken(Like.name),
//           useValue: model,
//         },
//       ],
//     }).compile();

//     service = module.get<LikeService>(LikeService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('create', () => {
//     it('should create a new like if it does not exist', async () => {
//       const like = new Like();
//       const data = {
//         userId:"399488485885",
//         postId:"988488488488"
//       }

//       like.userId = Object(data.userId);
//       like.postId = Object(data.postId);
//       model.findOne.mockResolvedValue(null);
//       model.save.mockResolvedValue(like);

//       expect(await service.create(like)).toBe(like);
//       expect(model.findOne).toHaveBeenCalledWith({ userId: like.userId, postId: like.postId });
//       expect(model.save).toHaveBeenCalled();
//     });

//     it('should delete the existing like if it exists', async () => {
//       const like = new Like();
//       const existingLike = new Like();
//       model.findOne.mockResolvedValue(existingLike);
//       model.findByIdAndDelete.mockResolvedValue(null);

//       await service.create(like);
//       expect(model.findOne).toHaveBeenCalledWith({ userId: like.userId, postId: like.postId });
//       expect(model.findByIdAndDelete).toHaveBeenCalledWith(existingLike._id);
//     });
//   });
// });