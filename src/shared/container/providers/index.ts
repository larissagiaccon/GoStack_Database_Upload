import { container } from 'tsyringe';

import IStorageProvider from '@storageProvider/IStorageProvider';
import DiskStorageProvider from '@diskStorageProvider/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);
