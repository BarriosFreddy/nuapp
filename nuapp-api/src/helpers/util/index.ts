import { Response } from 'express';

export const generateAuthKeyPair = (module: string, privilege: string) =>
  module.concat(':').concat(privilege);

export const setTenantIdToService = (res: Response, service: any) => {
  if (service) service.setTenantId = res.locals?.infoUser?.tenantId || '';
  return service;
};
