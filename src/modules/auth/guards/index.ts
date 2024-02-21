import { RolesGuard } from './role.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

export const GUARDS = [JwtAuthGuard, RolesGuard];
