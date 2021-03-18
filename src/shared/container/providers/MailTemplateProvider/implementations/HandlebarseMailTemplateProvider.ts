import fs from 'fs';
import handlebars from 'handlebars';

import IMailTemplateProvider from '@mailTemplateProvider/IMailTemplateProvider';
import IParseMailTemplateDTO from '@dtosMailTemplateProvider/IParseMailTemplateDTO';

export default class HandlebarseMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
