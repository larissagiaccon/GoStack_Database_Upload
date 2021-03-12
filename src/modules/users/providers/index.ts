import { container } from 'tsyringe';

import IHashProvider from '@hashProvidersUsers/IHashProvider';
import BCryptHashProvider from '@hashProvidersBCryptUsers/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
