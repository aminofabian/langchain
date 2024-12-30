export type JwtPayload = {
  email: string;
  passwordUpdatedAt: Date;
  id?: string;
  organizationId?: string;
  profileId?: string;
};
