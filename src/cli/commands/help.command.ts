import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.bgGreen('Программа для подготовки данных для REST API сервера.')}
        Пример:
            ${chalk.green('cli.js --<command> [--arguments]')}
        Команды:
            ${chalk.green('--version:')}                   ${chalk.gray('# выводит номер версии')}
            ${chalk.green('--help:')}                      ${chalk.gray('# печатает этот текст')}
            ${chalk.green('--import <path>:')}             ${chalk.gray('# импортирует данные из TSV')}
            ${chalk.green('--generate <n> <path> <url>')}  ${chalk.gray('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
