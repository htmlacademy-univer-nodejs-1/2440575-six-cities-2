import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`    Программа для подготовки данных для REST API сервера.
    ------------------------------------------------------
    ${chalk.yellow('cli.js ')}${chalk.green('--<command>')} ${chalk.cyan(' [--arguments]')}
    ------------------------------------------------------
    Команды:
      ${chalk.green('--version:')}                   ${chalk.white('# выводит номер версии')}
      ${chalk.green('--help:')}                      ${chalk.white('# печатает этот текст')}
      ${chalk.green('--import')}${chalk.cyan(' <path>:')}             ${chalk.white('# импортирует данные из TSV')}
      ${chalk.green('--generate')}${chalk.cyan(' <n> <path> <url>')}  ${chalk.white('# генерирует произвольное количество тестовых данных')}
    ------------------------------------------------------
    Пример: ${chalk.yellow('cli.js ')}${chalk.green('--import')} ${chalk.cyan('C:\\Users\\Nikita\\Desktop\\test-data.tsv')}
    `);
  }
}
