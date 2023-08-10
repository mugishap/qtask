import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ExcelJS from 'exceljs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExcelService {

    constructor(
        private readonly prisma: PrismaService,
        private configService: ConfigService
    ) { }

    async generateExcelData(startDate: Date, endDate: Date): Promise<ExcelJS.Buffer> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Tasks');

        const tasks = await this.prisma.task.findMany({
            include: {
                file: true,
                assignees: true,
                project: true
            },
            where: {
                startDate: {
                    gte: startDate
                },
                endDate: {
                    lte: endDate
                }
            }
        })

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 44 },
            { header: 'Name', key: 'name', width: 36 },
            { header: 'Description', key: 'description', width: 84 },
            { header: 'Priority', key: 'priority', width: 10 },
            { header: 'Project', key: 'project', width: 32 },
            { header: 'Assignees', key: 'assignees', width: 44 },
            { header: 'File', key: 'file', width: 10 },
            { header: "Task URL", key: 'task_url', width: 10 }
        ]

        tasks.forEach(task => {
            worksheet.addRow({
                id: task.id,
                name: task.name,
                description: task.description,
                priority: task.priority,
                project: { text: task.project.name, hyperlink: `${this.configService.get("CLIENT_URL")}/project/${task.projectId}` },
                assignees: task.assignees.map(assignee => assignee.names).join(", "),
                file: { text: task.file.name, hyperlink: task.file.url },
                task_url: { text: "Click here", hyperlink: `${this.configService.get("CLIENT_URL")}/task/${task.id}` }
            })
        })

        worksheet.getRow(1).font = { bold: true }
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFA500' }
        }

        worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }
}
