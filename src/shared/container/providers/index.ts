import { container } from 'tsyringe';

import IStorageProvider from '@storageProvider/IStorageProvider';
import DiskStorageProvider from '@diskStorageProvider/DiskStorageProvider';

import IMailProvider from '@mailProvider/IMailProvider';
import EtherealMailProvider from '@etherealMailProvider/EtherealMailProvider';

import IMailTemplateProvider from '@mailTemplateProvider/IMailTemplateProvider';
import HandlebarseMailTemplateProvider from '@handlebarseMailTemplateProvider/HandlebarseMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarseMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
