// import { Test, TestingModule } from '@nestjs/testing';
// import { LikeController } from './like.controller';
// import { LikeService } from './like.service';
// import { Like } from './entities/like.entity';

// describe('LikeController', () => {
//   let controller: LikeController;
//   let service: LikeService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [LikeController],
//       providers: [
//         {
//           provide: LikeService,
//           useValue: {
//             create: jest.fn().mockResolvedValue(new Like()),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<LikeController>(LikeController);
//     service = module.get<LikeService>(LikeService);
//   });

// it('should be defined', () => {
//     expect(controller).toBeDefined();
// });

// describe('create', () => {
//     it('should call service.create and return the result', async () => {
//         const like = new Like();
//         jest.spyOn(service, 'create').mockResolvedValue(like);

//         expect(await controller.create(like)).toBe(like);
//         expect(service.create).toHaveBeenCalledWith(like);
//     });
// });
// });