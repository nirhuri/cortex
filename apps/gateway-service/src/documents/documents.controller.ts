import { Request } from "express";
import { Controller, Get, UseGuards, Req, Post, Body } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { HttpService as LegacyHttpService } from "@nestjs/axios";

@Controller("documents")
export class DocumentsController {
    constructor(private readonly httpService: LegacyHttpService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserDocuments(@Req() req: Request): Promise<any> {
        const userId = req.user!.sub;

        const response = await this.httpService.axiosRef.get(
            `http://localhost:3001/documents?userId=${userId}`
        );

        if (response.status !== 200) {
            throw new Error("Failed to fetch user documents");
        }

        return response.data;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createDocument(@Req() req: Request, @Body() body: { title: string; }): Promise<any> {
        const userId = req.user!.sub;

        const response = await this.httpService.axiosRef.post(
            `http://localhost:3001/documents`,
            {
                title: body.title,
                ownerId: userId,
            }
        );

        if (response.status !== 201) {
            throw new Error("Failed to create document");
        }
        return response.data;
    }
}