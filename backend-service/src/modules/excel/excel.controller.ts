import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './excel.service';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('excel')
export class ExcelController {
    constructor(private readonly excelService: ExcelService) { }

    @Get()
    @ApiQuery({ name: 'startDate', type: Date, required: true, example: '2023-08-10T00:00:00.000Z' })
    @ApiQuery({ name: 'endDate', type: Date, required: true, example: '2023-08-10T00:00:00.000Z' })
    async downloadExcel(@Res() res: Response, @Query("startDate") startDate: Date, @Query("endDate") endDate: Date) {
        const buffer = await this.excelService.generateExcelData(startDate, endDate);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');
        res.send(buffer);
    }
}
