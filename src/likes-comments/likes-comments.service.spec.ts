import { Test, TestingModule } from '@nestjs/testing';
import { LikesCommentsService } from './likes-comments.service';

describe('LikesCommentsService', () => {
  let service: LikesCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikesCommentsService],
    }).compile();

    service = module.get<LikesCommentsService>(LikesCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
