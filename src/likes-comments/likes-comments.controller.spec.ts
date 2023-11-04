import { Test, TestingModule } from '@nestjs/testing';
import { LikesCommentsController } from './likes-comments.controller';

describe('LikesCommentsController', () => {
  let controller: LikesCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesCommentsController],
    }).compile();

    controller = module.get<LikesCommentsController>(LikesCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
