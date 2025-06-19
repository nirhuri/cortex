import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { DocumentsController } from "@gateway/documents/documents.controller";
import { JwtAuthGuard } from "@gateway/auth/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "changeme",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [DocumentsController],
  providers: [JwtAuthGuard],
})
export class AppModule { }