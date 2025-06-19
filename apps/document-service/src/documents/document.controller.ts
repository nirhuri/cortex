import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDocumentDto } from '@docs/documents/dto/create-document.dto';
import { DocumentCommandService } from '@docs/documents/services/document-command.service';
import { DocumentQueryService } from '@docs/documents/services/document-query.service';

@Controller('documents')
export class DocumentController {
    constructor(
        private readonly commandService: DocumentCommandService,
        private readonly queryService: DocumentQueryService,
    ) { }

    @Post()
    create(@Body() dto: CreateDocumentDto) {
        return this.commandService.createDocument(dto);
    }

    @Get('user/:userId')
    getUserDocs(@Param('userId') userId: string) {
        return this.queryService.findByUser(userId);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.queryService.findById(id);
    }

    @Get(":id/state")
    async getState(@Param("id") id: string) {
        return this.queryService.rebuildDocument(id);
    }
}