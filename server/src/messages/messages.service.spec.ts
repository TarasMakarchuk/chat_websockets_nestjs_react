import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import TestUtil from "../common/test/testUtil";
import {MessagesService} from "./messages.service";
import {Message} from "./entities/message.entity";

describe('ArticlesService', () => {
    let service: MessagesService;
    let message;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessagesService,
                {
                    provide: getRepositoryToken(Message),
                    useValue: null,
                },
            ],
        }).compile();

        service = module.get<MessagesService>(MessagesService);
        message = TestUtil.getMessageWithoutId();
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create message', () => {
        it('should be create one message with id', async () => {
            const newMessage = await service.create(message);
            const messages = await service.findAll();

            expect(Array.isArray(messages)).toBe(true);
            expect(messages).toHaveLength(1);
            messages.forEach(item => expect(item).toHaveProperty('id'));
            messages.forEach(item => expect(item.id).toBe(newMessage.id));
            messages.forEach(item => expect(item).toMatchObject(newMessage));
        });
    });

    describe('find all messages', () => {
        it('should be list all messages', async () => {
            for (let i = 0; i < 2; i++) {
                await service.create({...message});
            }
            const messages = await service.findAll();

            expect(messages).toHaveLength(3);
            messages.forEach(item => expect(item).toMatchObject({text: message.text}));
            messages.forEach(item => expect(item).toHaveProperty('id'));
            messages.forEach(item => expect(item).toHaveProperty('name', message.name));
            messages.forEach(item => expect(item).toHaveProperty('text', message.text));
        });
    });
});
